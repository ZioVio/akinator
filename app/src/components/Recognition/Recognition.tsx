import React from "react";
import { useVoiceRecognition } from "../../hooks";

// just for demo
export const Recognition: React.FC = () => {
  const { startRecognizing, isRecognizing } = useVoiceRecognition({
    onRecognized(ev) {
      console.log("ev:", ev);
    },
  });

  return (
    <>
      {isRecognizing && <p>Recognizing...</p>}
      <button onClick={startRecognizing}>Recognize</button>
    </>
  );
};
