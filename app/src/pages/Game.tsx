import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAnswerRecognition } from "../hooks/useAnswerRecognition";
import { speak } from "../utils";
import { answer, Guess, start, win } from "../utils/api";
import { getAnsweredIndex } from "../utils/getAnsweredIndex";
import { shouldTryToGuess } from "../utils/shouldTryToGuess";

export const Game: React.FC = () => {
  const { startRecognizing, isRecognizing, answers, resetAnswers } =
    useAnswerRecognition();

  const questionCountRef = useRef(0);

  const shouldTryToWin = shouldTryToGuess(questionCountRef.current);

  const isAnswered = useMemo(
    () => answers.some((answer) => answer.selected),
    [answers]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [guess, setGuess] = useState<Guess | null>(null);

  const onQuestionChanged = useCallback(
    async (q: string) => {
      questionCountRef.current++;
      setIsLoading(false);
      setQuestion(q);
      if (!shouldTryToGuess(questionCountRef.current)) {
        speak(q);
        setTimeout(() => {
          startRecognizing();
        }, 2000);
      }
    },
    [startRecognizing]
  );

  const onYesPress = useCallback(() => {
    console.log("NAVIGATE TO CONGRATS SCREEN AND START AGAIN");
  }, []);

  const onNoPress = useCallback(() => {
    setGuess(null);
    speak(question);
  }, [question]);

  useEffect(() => {
    setIsLoading(true);
    start().then((res) => {
      onQuestionChanged(res.question || "");
    });
  }, [onQuestionChanged]);

  useEffect(() => {
    if (isAnswered) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        const answerIndex = getAnsweredIndex(answers);
        if (answerIndex === -1) {
          return;
        }
        resetAnswers();
        answer(answerIndex).then((res) => {
          onQuestionChanged(res.question || "");
        });
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [answers, isAnswered, onQuestionChanged, resetAnswers, shouldTryToWin]);

  useEffect(() => {
    if (shouldTryToWin) {
      speak("I will try to quess the character now");
      setIsLoading(true);
      win()
        .then((res) => {
          const guess = res.guesses[0];
          setGuess(guess);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [shouldTryToWin]);

  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      if (ev.code === "Space") {
        startRecognizing();
      }
    };

    document.addEventListener("keypress", listener);
    return () => document.removeEventListener("keypress", listener);
  }, [startRecognizing]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isRecognizing && <p>Recognizing...</p>}
      {guess ? (
        <div>
          <h4>I think it is {guess.name}</h4>
          <p>{guess.description}</p>
          <img src={guess.absolute_picture_path} alt={guess.description} />
          <button onClick={onYesPress}>Yes</button>
          <button onClick={onNoPress}>No</button>
        </div>
      ) : (
        <>
          <h3>{question}</h3>
          {answers.map((answer) => (
            <p key={answer.text}>
              {answer.text} {answer.selected.toString()}
            </p>
          ))}
        </>
      )}
    </>
  );
};
