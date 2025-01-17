import OpenAIPackage from "openai";
import { CONFIG } from "../../config/config";
import { AiInterface } from "../ai/ai.interface";
import { ChoicesInterface } from "../ai/interfaces/completions-choice.interface";
import { ChatCompletion, ChatCompletionMessageParam, ChatCompletionUserMessageParam } from "openai/resources";

export class OpenAI implements AiInterface {
  client: OpenAIPackage;
  constructor() {
    this.client = new OpenAIPackage({
      apiKey: CONFIG.openAiApiKey,
    });
  }

  async createCompletions(contents: string[], instructions?: string) {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "developer",
        content: [
          {
            type: "text",
            text: `${instructions ?? CONFIG.chatInstructions}`,
          },
        ],
      },
      ...contents.map((content: string): ChatCompletionUserMessageParam => {
        return {
          role: "user",
          content: [
            {
              type: "text",
              text: `###${content}###`,
            },
          ],
        };
      }),
    ];

    const completions = await this.client.chat.completions.create({
      model: "gpt-4o",
      messages,
    });

    return {
      ...completions,
      choices: completions.choices.map(
        (choice: ChatCompletion.Choice): ChoicesInterface => {
          return {
            message: choice.message.content,
          };
        }
      ),
    };
  }
}
