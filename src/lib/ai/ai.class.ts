import { CONFIG } from "../../config/config";
import { AiSummaryNewResponseDto } from "../../repositories/summarized-news-repository/dto/ai-summary-new-response.dto";
import { AiInterface } from "./ai.interface";

export class Ai {
  constructor(private readonly aiService: AiInterface) {}

  async summarizeTexts(texts: string[]): Promise<AiSummaryNewResponseDto[]> {
    let index = 0;
    const textsToProcess: string[][] = [];

    do {
      textsToProcess.push(
        texts.slice(index, index + CONFIG.deepseekNewsLimitPerChat)
      );
      index += CONFIG.deepseekNewsLimitPerChat;
    } while (index < texts.length);

    const content: AiSummaryNewResponseDto[] = (
      await Promise.all(
        textsToProcess.map(async (textsPack) => {
          try {
            const res = await this.aiService.createCompletions(
              textsPack,
              CONFIG.chatInstructions
            );

            const content = res?.choices?.[0]?.message?.replace('```json', '').replace('```', '') || '';
            return JSON.parse(content) as AiSummaryNewResponseDto[];
          } catch (error) {
            console.log(error)
            return [];
          }
        })
      )
    ).flat();

    return content;
  }
}
