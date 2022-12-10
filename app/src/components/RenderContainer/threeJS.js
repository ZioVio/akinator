import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';


const kamila = new URL('./assets/kamila.glb', import.meta.url);
const background = new URL('./assets/background.jpg', import.meta.url);
class App {

    constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        this.grid = new THREE.GridHelper(30, 30);
        this.clock = new THREE.Clock();
        this.assetLoader = new GLTFLoader();
        this.bgTexture = new THREE.TextureLoader();
        this.mixer = null;
        this.mainAction = null;
        this.actionTimeout = null;
        this.light = new THREE.AmbientLight( 0xffffff , 2.5);
    }

    init(node) {
        this.renderer.setSize(node.clientWidth, node.clientHeight);

        node.appendChild(this.renderer.domElement);

        this.renderer.setClearColor(0xA3A3A3);

        this.bgTexture.load(background.href , (texture) => {
                this.scene.background = texture;
            }
        );

        this.camera.position.set(0, 4, 10);
        this.camera.aspect = node.clientWidth/node.clientHeight;
        this.camera.updateProjectionMatrix();
        this.orbit.minPolarAngle = Math.PI/3;
        this.orbit.maxPolarAngle = Math.PI/3;
        this.orbit.enableZoom = false;
        this.orbit.update();
        this.scene.add(this.light);
        this.assetLoader.load(kamila.href, this.onLoad.bind(this), undefined, function(error) {
            console.error(error);
        });
        this.renderer.setAnimationLoop(this.animate.bind(this));
        node.addEventListener('resize', ()=>{this.onWindowResize(node)});
    }

    onLoad(gltf) {
        const model = gltf.scene;
        this.scene.add(model);
        this.mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations;

        const clip = THREE.AnimationClip.findByName(clips, 'Animation');
        this.mainAction = this.mixer.clipAction(clip);
        this.mainAction.play();
        this.mainAction.paused = true;
    }

    onWindowResize(node) {
        this.camera.aspect = node.clientWidth/node.clientHeight;
        this.camera?.updateProjectionMatrix();
        this.renderer?.setSize(node.clientWidth, node.clientHeight);
    }

    animate() {
        this.mixer?.update(this.clock.getDelta());
        this.renderer?.render(this.scene, this.camera);
    }

    action(duration = 5, delay = 0) {
        if(!this.mainAction) return;
        clearTimeout(this.actionTimeout);
        this.mainAction.time = delay;
        this.mainAction.play();
        this.mainAction.paused = false;
        this.actionTimeout = setTimeout(()=>{
            this.mainAction.paused = true;
        }, duration * 1000)
    }

}



export default App;
