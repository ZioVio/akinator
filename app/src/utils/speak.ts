/**
 * Akinator's voice
 */
export const speak = async (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 1;
  utterance.rate = 1;
  utterance.voice = speechSynthesis.getVoices()[0];
  speechSynthesis.speak(utterance);
  return new Promise<void>((resolve, reject) => {
    utterance.onend = () => {
      resolve();
    };
    utterance.onerror = (err) => {
      reject(err);
    };
  });
};
