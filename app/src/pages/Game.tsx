import { useAnswerRecognition } from "../hooks/useAnswerRecognition";

export const Game: React.FC = () => {
  const { startRecognizing, isRecognizing, answers, resetAnswers } = useAnswerRecognition();

  return (
    <>
      {isRecognizing && <p>Recognizing...</p>}
      {answers.map((answer) => (
        <p>{answer.text} {answer.selected.toString()}</p>
      ))}
      <button onClick={startRecognizing} disabled={isRecognizing}>Answer</button>
      <button onClick={resetAnswers} disabled={isRecognizing}>Reset</button>
    </>
  );
};
