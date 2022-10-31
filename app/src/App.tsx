import React from "react";
import "./App.css";
import { Synthesis, Recognition } from "./components";

function App() {
  return (
    <div className="App">
      <Recognition />
      <Synthesis />
    </div>
  );
}

export default App;
