import { useCallback, useEffect, useState } from "react";
import { AnswersMap } from "../types";

const SpeechRecognitionCompat =
  window?.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarListCompat =
  window?.SpeechGrammarList || webkitSpeechGrammarList;

const recognition = new SpeechRecognitionCompat();
const speechRecognitionList = new SpeechGrammarListCompat();

const phrases = [
  AnswersMap.Yes,
  AnswersMap.No,
  AnswersMap.DontKnow,
  AnswersMap.Probably,
  AnswersMap.ProbablyNot,
];
const grammar = `#JSGF V1.0; grammar answers; public <answer> = ${phrases.join(
  " | "
)};`;

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

type VoiceRecognitionArgs = {
  onRecognized: (ev: SpeechRecognitionEvent) => void;
  onError?: (ev: SpeechRecognitionError) => void;
};

export const useVoiceRecognition = ({
  onError,
  onRecognized,
}: VoiceRecognitionArgs): {
  isRecognizing: boolean;
  startRecognizing: () => void;
  stopRecognizing: () => void;
} => {
  const [isRecognizing, setIsRecognizing] = useState(false);

  useEffect(() => {
    recognition.onresult = onRecognized;

    const errorHandler = onError || ((ev: SpeechRecognitionError) => {});
    recognition.onerror = errorHandler;

    const onSpeechEnd = () => {
      recognition.stop();
      setIsRecognizing(false);
    };
    recognition.onspeechend = onSpeechEnd;

    return () => {
      recognition.removeEventListener("error", errorHandler as EventListener);
      recognition.removeEventListener("result", onRecognized as EventListener);
      recognition.removeEventListener(
        "speechend",
        onSpeechEnd as EventListener
      );
    };
  }, [onError, onRecognized]);

  const startRecognizing = useCallback(() => {
    recognition.start();
    setIsRecognizing(true);
  }, []);

  const stopRecognizing = useCallback(() => {
    recognition.stop();
    setIsRecognizing(false);
  }, []);

  return {
    isRecognizing,
    startRecognizing,
    stopRecognizing,
  };
};
