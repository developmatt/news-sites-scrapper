import OpenAIPackage from 'openai';
import { CONFIG } from '../../config/config';
import { AiInterface } from '../../core/ai/ai.interface';
import { ChatCompletionMessageParam, ChatCompletionUserMessageParam } from 'openai/resources';

export class Deepseek implements AiInterface {
  client: OpenAIPackage;
  constructor() {
    this.client = new OpenAIPackage({
      baseURL: 'https://api.deepseek.com',
      apiKey: CONFIG.deepseekApiKey,
    });
  }

  async createCompletions(contents: string[], instructions?: string) {
    const messages: ChatCompletionMessageParam[] = [
      {
        "role": "system",
        "content": [
          {
            "type": "text",
            "text": `${instructions ?? CONFIG.chatInstructions}`
          }
        ]
      },
      ...contents.map((content: string): ChatCompletionUserMessageParam => {
        return {
          role: "user",
          content: [
            {
              "type": "text",
              "text": `###${content}###`
            }
          ]
        }
      })
    ];


    return this.client.chat.completions.create({
      model: "deepseek-chat",
      messages
    });
  }
}