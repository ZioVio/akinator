/**
 * Akinator's voice
 */
export const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 2;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
};
