import OpenAIPackage from 'openai';
import { CONFIG } from '../config/config';
import { AiInterface } from '../core/ai/ai.interface';
import { ChatCompletionMessageParam, ChatCompletionUserMessageParam } from 'openai/resources';

export class OpenAI implements AiInterface {
  client: OpenAIPackage;
  constructor() {
    this.client = new OpenAIPackage({
      apiKey: CONFIG.openAiApiKey,
    });
  }

  async createCompletions(contents: string[], instructions?: string) {
    if (!CONFIG.isProd) return {
      choices: [
        {
          message: {
            content: "```json\n{\n  \"role\": \"developer\",\n  \"content\": [\n    {\n      \"type\": \"text\",\n      \"text\": \"Please provide a list of contents to be summarized\"\n    }\n  ]\n}\n```"
          }
        }
      ]
    }
    const messages: ChatCompletionMessageParam[] = [
      {
        "role": "developer",
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
      model: "gpt-4o",
      messages
    })
  }
}