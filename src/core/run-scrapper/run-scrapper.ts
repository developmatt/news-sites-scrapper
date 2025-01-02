import { CONFIG } from "../../config/config";
import { RawNewsCategoryEnum } from "../../enums/raw-news-category.enum";
import { SummarizedNewMoodsEnum } from "../../enums/summarized-new-moods.enum";
import { DeepseekMock } from "../../lib/deepseek/deepseek-mock.class";
import { Deepseek } from "../../lib/deepseek/deepseek.class";
import { SummarizedNewsRepository } from "../../repositories/summarized-news-repository/summarized-news-repository.repository";
import { Ai } from "../ai/ai.class";
import { extractNews } from "../raw-news/extract-news/extract-news";
import { selectRawNewsToSummarize } from "../select-raw-news-to-summarize";
import { MapSummarizedNewsToStoreUsecase } from "../summarized-news/map-summarized-news-to-store.use-case";

export const runScrapper = async (): Promise<void> => {
  await extractNews();
  const news = await selectRawNewsToSummarize();
  const contentsArray = news?.map((item) => {
    return JSON.stringify({
      id: item.id,
      content: item.content,
    });
  });

  const openAIDep = CONFIG.isProd ? new Deepseek() : new DeepseekMock();
  const ai = new Ai(openAIDep);
  const summarized = await ai.summarizeTexts(contentsArray);

  const summarizedRepository = new SummarizedNewsRepository();
  const mapSummarizedNewsToStoreUsecase = new MapSummarizedNewsToStoreUsecase();
  await Promise.all(
    summarized.map(async (item, index) => {
      await summarizedRepository.create(mapSummarizedNewsToStoreUsecase.execute(item, news[index]));
    })
  );
};
