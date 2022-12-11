export const AnswersMap = {
  Yes: "yes",
  No: "no",
  DontKnow: "don't know",
  Probably: "probably",
  ProbablyNot: "probably not",
};

export type AnswerIndex = 0 | 1 | 2 | 3 | 4;

export type Answer = {
  text: string;
  selected: boolean;
};
