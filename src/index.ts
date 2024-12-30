import { CONFIG } from "./config/config";
import { Ai } from "./core/ai/ai.class";
import { extractNews } from "./core/extract-news";
import { selectRawNewsToSummarize } from "./core/select-raw-news-to-summarize";
import { AppDataSource } from "./infra/database/data-source";
import { OpenAIMock } from "./lib/open-ai/open-ai-mock.class";
import { OpenAI } from "./lib/open-ai/open-ai.class";
import { SummarizedNewsRepository } from "./repositories/summarized-news-repository/summarized-news-repository.repository";
import { RawNewsCategoryEnum } from "./enums/raw-news-category.enum";
import { SummarizedNewMoodsEnum } from "./enums/summarized-new-moods.enum";
import "reflect-metadata";

AppDataSource.initialize()
  .then(async () => {
    await extractNews();
    const news = await selectRawNewsToSummarize();
    const contentsArray = news?.map((item) => {
      return JSON.stringify({
        id: item.id,
        content: item.content,
      });
    });

    const openAIDep = CONFIG.isProd ? new OpenAI() : new OpenAIMock();
    const ai = new Ai(openAIDep);
    const summarized = await ai.summarizeTexts(contentsArray);

    const summarizedRepository = new SummarizedNewsRepository();
    await Promise.all(
      summarized.map(async (item, index) => {
        await summarizedRepository.create({
          title: item.title,
          content: item.content,
          tags: item.tags,
          categories: item.categories.map((category) => RawNewsCategoryEnum[category.toUpperCase().replace(/\s+/g, '_') as unknown as keyof typeof RawNewsCategoryEnum]),
          mood: SummarizedNewMoodsEnum[item.mood.toUpperCase() as keyof typeof SummarizedNewMoodsEnum],
          rawNews: news[index],
        });
      })
    );
  })
  .catch((error) => console.log(error));
