import { CONFIG } from "../config/config";
import { Ai } from "../lib/ai/ai.class";
import { DeepseekMock } from "../lib/deepseek/deepseek-mock.class";
import { Deepseek } from "../lib/deepseek/deepseek.class";
import { extractNews } from "../use-cases/raw-news/extract-news/extract-news";
import { selectRawNewsToSummarize } from "../use-cases/raw-news/select-raw-news-to-summarize.use-case";
import { MapSummarizedNewsToStoreUsecase } from "../use-cases/summarized-news/map-summarized-news-to-store.use-case";
import { SummarizedNewsRepository } from "../use-cases/summarized-news/summarized-news-repository.repository";

export const runScrapperFlowAction = async () => {
  try {
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
    const mapSummarizedNewsToStoreUsecase =
      new MapSummarizedNewsToStoreUsecase();
    await Promise.all(
      summarized.map(async (item, index) => {
        const mapped = mapSummarizedNewsToStoreUsecase.execute(
          item,
          news[index]
        );
        await summarizedRepository.create(mapped);
      })
    );

    return;
  } catch (error) {
    console.log(error);
  }
};
