import OpenAIPackage from 'openai';
import { CONFIG } from '../../config/config';
import { AiInterface } from '../ai/ai.interface';
import { ChoicesInterface } from '../ai/interfaces/completions-choice.interface';
import { ChatCompletion, ChatCompletionMessageParam, ChatCompletionUserMessageParam } from 'openai/resources/chat/completions.mjs';

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


    const completions = await this.client.chat.completions.create({
      model: "deepseek-chat",
      messages
    });

    return {
      ...completions,
      choices: completions.choices.map((choice: ChatCompletion.Choice): ChoicesInterface => {
        return {
          message: choice.message.content,
        }
      })
    }
  }
}