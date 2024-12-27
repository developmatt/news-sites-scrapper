import 'dotenv/config';

export const CONFIG = {
  newsLimitPerSite: Number(process.env.NEWS_LIMIT_PER_SITE),
  openAiApiKey: process.env.OPENAI_API_KEY,
  chatInstructions: process.env.CHAT_INSTRUCTIONS,
}