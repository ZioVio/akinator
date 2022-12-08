import { useCallback, useState } from "react";
import { AnswersMap } from "../types";
import { useVoiceRecognition } from "./useVoiceRecognition";

type Answer = {
  text: string;
  selected: boolean;
};

type AnswerRecognitionReturnValue = {
  isRecognizing: boolean;
  startRecognizing: () => void;
  answers: Answer[];
  resetAnswers: () => void;
};

const initialAnswers: Answer[] = Object.values(AnswersMap).map((ans) => ({
  text: ans.toLowerCase(),
  selected: false,
}));

export const useAnswerRecognition = (): AnswerRecognitionReturnValue => {
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers);
  console.log('answers:', answers);

  const onRecognized = useCallback(
    (ev: SpeechRecognitionEvent) => {
      const answer = ev.results?.[0]?.[0]?.transcript?.toLowerCase();
      setAnswers((prevAnswers) =>
        prevAnswers.map((a) => {
          if (a.text === answer) {
            return {
              ...a,
              selected: true,
            };
          }
          return a;
        })
      );
    },
    []
  );

  const { startRecognizing, isRecognizing } = useVoiceRecognition({
    onRecognized,
  });

  const resetAnswers = useCallback(() => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((a) => ({ ...a, selected: false }))
    );
  }, []);

  return {
    isRecognizing,
    startRecognizing,
    answers,
    resetAnswers,
  };
};
