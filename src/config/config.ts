import 'dotenv/config';

export const CONFIG = {
  env: process.env.NODE_ENV,
  isProd: process.env.NODE_ENV === 'production',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  newsLimitPerSite: Number(process.env.NEWS_LIMIT_PER_SITE),
  openAiApiKey: process.env.OPENAI_API_KEY,
  deepseekApiKey: process.env.DEEPSEEK_API_KEY,
  deepseekNewsLimitPerChat: Number(process.env.DEEPSEEK_NEWS_LIMIT_PER_CHAT),
  chatInstructions: process.env.CHAT_INSTRUCTIONS,
  dbHost: process.env.DB_HOST,
  dbPort: Number(process.env.DB_PORT),
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
}