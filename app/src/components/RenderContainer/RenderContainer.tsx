import React, {useEffect, useMemo} from "react";
import threeJS from './threeJS'
import styles from './RenderContainer.module.scss'
import {AnimationAction} from "../../types";

const canvasRenderer = new threeJS();

type RenderContainerProps = {
    action : AnimationAction
}

export const RenderContainer: React.FC<RenderContainerProps> = ({action}) => {

    useEffect(()=>{
        canvasRenderer.action(action.duration, action.delay);
    }, [action])

    return useMemo(() => {
        return <div id={"canva"} className={styles.canva} ref={node => canvasRenderer.init(node)}></div>
    }, [])
};
