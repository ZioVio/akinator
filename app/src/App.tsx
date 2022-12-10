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
import {I_DIDNT_GUESS, I_TOLD_YOU, SIMPLE_TALK} from "./actions";

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
      <button onClick={()=>{dispatch(SIMPLE_TALK())}}>SIMPLE_TALK</button>
      <button onClick={()=>{dispatch(I_DIDNT_GUESS())}}>I_DIDNT_GUESS</button>
      <button onClick={()=>{dispatch(I_TOLD_YOU())}}>I_TOLD_YOU</button>
      <RenderContainer action={state.animation}/>
    </div>
  );
}

export default App;
