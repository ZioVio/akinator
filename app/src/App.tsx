import React, {createContext, useContext, useReducer} from "react";
import "./App.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import { Synthesis, Recognition } from "./components";
import { Welcome } from "./pages/Welcome";
import { Game } from "./pages/Game";
// import {RenderContainer} from "./components/RenderContainer/RenderContainer";
// import {Simulate} from "react-dom/test-utils";
// import animationEnd = Simulate.animationEnd;
// import {I_DIDNT_GUESS, I_TOLD_YOU, SIMPLE_TALK} from "./actions";

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

const initialAnimation = {
  animation: {
    duration: 0,
    delay: 0
  }
};

export type ReducerContextType = {
  state: typeof initialAnimation,
  dispatch:(action: any) => void
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ANIMATE":
      console.log(JSON.stringify(action.payload))
      return {...state, animation: action.payload};
    default:
      return state;
  }
};

export const reducerContext = createContext<ReducerContextType>({state: initialAnimation, dispatch: ()=>{console.log("huy")}})

const ReducerContextProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) =>{
  const [state, dispatch] = useReducer(reducer, initialAnimation);
  return (
      <reducerContext.Provider value={{state, dispatch}}>
        {props.children}
      </reducerContext.Provider>
  );
}

export const useReducerContext = () => useContext(reducerContext)

function App() {

  return (
    <div className="App d-flex justify-content-center p-5">
      <ReducerContextProvider>
        <RouterProvider router={router} />
      </ReducerContextProvider>
    </div>
  );
}

export default App;
