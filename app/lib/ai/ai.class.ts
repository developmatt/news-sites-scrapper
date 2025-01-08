import { AiSummaryNewResponseDto } from "@/app/use-cases/summarized-news/dto/ai-summary-new-response.dto";
import { CONFIG } from "../../config/config";
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

            
            const content = res?.choices[0].message.content.replace('```json', '').replace('```', '');
            console.log(">>>content")
            console.log(JSON.parse(content))
            return JSON.parse(content) as AiSummaryNewResponseDto[];
          } catch (error) {
            console.log(error)
            return [];
          }
        })
      )
    ).flat();

    return content;

    // const res = await this.aiService.createCompletions(texts, CONFIG.chatInstructions)
    // console.log(">>>>res", res)
    // console.log("----------------------------------------------------------------")

    // console.log(">>>>>choices")
    // console.log(res?.choices[0].message.content)
    // const content = res?.choices[0].message.content.replace('```json', '').replace('```', '')
    // const content = res?.choices[0].message.content
    // return content

    // return JSON.parse(content)
  }
}
