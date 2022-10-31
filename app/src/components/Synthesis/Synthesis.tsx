import React, { useState } from "react";
import { speak } from "../../utils";

// just for demo
export const Synthesis: React.FC = () => {
  const [text, setText] = useState("");

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(ev) => setText(ev.target.value)}
      />
      <button onClick={() => speak(text)}>Speak</button>
    </div>
  );
};
