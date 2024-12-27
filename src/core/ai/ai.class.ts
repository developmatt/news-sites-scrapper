import { CONFIG } from "../../config/config";
import { AiInterface } from "./ai.interface";

export class Ai {
  constructor(private readonly aiService: AiInterface) {}

  async summarizeTexts(texts: string[]): Promise<string> {
    const res = await this.aiService.createCompletions(texts, CONFIG.chatInstructions)
    return res?.choices?.[0]?.message.content.replace('```json', '').replace('```', '')
  }
}