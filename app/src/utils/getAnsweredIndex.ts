import { Answer } from "../types";
import { AnswerIndex } from "../types";

export const getAnsweredIndex = (answers: Answer[]): AnswerIndex | -1 => {
    const index = answers.findIndex(a => a.selected);
    return index as AnswerIndex | -1;
}  