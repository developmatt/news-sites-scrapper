import { CreateCompletionsResponseInterface } from "./interfaces/create-completions-response.interface";

export interface AiInterface {
  createCompletions($arg0: string[], $arg1?: string): Promise<CreateCompletionsResponseInterface>;
}