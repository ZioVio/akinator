import { AnswerIndex } from "./../types";
import { API_BASE_URL } from "../config";

export type Guess = {
  id: string;
  name: string;
  id_base: string;
  proba: string;
  absolute_picture_path: string;
  award_id: string;
  corrupt: string;
  description: string;
  picture_path: string;
  pseudo: string;
  ranking: string;
  relative: string;
  valide_contrainte: string;
  nsfw?: boolean;
};

type AkiAnswerResponse = {
  question: string | undefined;
  answers: string[];
};

type AkiGuessResponse = {
    guesses: Guess[];
}

const get = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const post = async (url: string, body: any) => {
  const response = await fetch(url, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const data = await response.json();
  return data;
};

export const start = async (): Promise<AkiAnswerResponse> => {
  return get(`${API_BASE_URL}/start`);
};

export const answer = async (answer: AnswerIndex): Promise<AkiAnswerResponse> => {
  return post(`${API_BASE_URL}/answer`, { answer });
};

export const win = async (): Promise<AkiGuessResponse> => {
  return get(`${API_BASE_URL}/win`);
};
