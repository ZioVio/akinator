export const shouldTryToGuess = (answersCount: number): boolean => {
  return answersCount % 5 === 0 && answersCount > 0;
};
