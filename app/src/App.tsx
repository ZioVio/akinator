import React, {useReducer} from "react";
import "./App.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import { Synthesis, Recognition } from "./components";
import { Welcome } from "./pages/Welcome";
import { Game } from "./pages/Game";
import {RenderContainer} from "./components/RenderContainer/RenderContainer";
import {Simulate} from "react-dom/test-utils";
import animationEnd = Simulate.animationEnd;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

const initialTodos = {
  animation: {
    duration: 0,
    delay: 0
  }
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ANIMATE":
      return {...state, animation: action.payload};
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialTodos);
  return (
    <div className="App">
      {/*<RouterProvider router={router} />*/}
      {/* <Recognition />
      <Synthesis /> */}
      <button onClick={()=>{dispatch({type: "ANIMATE", payload: {delay: 0, duration: 5}})}}>qwe</button>
      <RenderContainer action={state.animation}/>
    </div>
  );
}

export default App;
