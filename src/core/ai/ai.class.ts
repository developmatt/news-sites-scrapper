import { CONFIG } from "../../config/config";
import { AiSummaryNewResponseDto } from "../../repositories/summarized-news-repository/dto/ai-summary-new-response.dto";
import { AiInterface } from "./ai.interface";

export class Ai {
  constructor(private readonly aiService: AiInterface) {}

  async summarizeTexts(texts: string[]): Promise<AiSummaryNewResponseDto[]> {
    const res = await this.aiService.createCompletions(texts, CONFIG.chatInstructions)
    const content = res?.choices?.[0]?.message.content.replace('```json', '').replace('```', '')

    return JSON.parse(content)
  }
}