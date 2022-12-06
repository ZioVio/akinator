import React from "react";
import "./App.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import { Synthesis, Recognition } from "./components";
import { Welcome } from "./pages/Welcome";
import { Game } from "./pages/Game";

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

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <Recognition />
      <Synthesis /> */}
    </div>
  );
}

export default App;
