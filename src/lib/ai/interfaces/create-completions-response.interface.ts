import { ChoicesInterface } from "./completions-choice.interface";

export interface CreateCompletionsResponseInterface {
  [key: string]: [] | string | number | boolean | null | object | ChoicesInterface[];
  choices: ChoicesInterface[];
}