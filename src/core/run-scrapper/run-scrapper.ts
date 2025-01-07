import { extractNews } from "../../../app/use-cases/raw-news/extract-news/extract-news";

export const runScrapper = async (): Promise<void> => {
  await extractNews();
  // const news = await selectRawNewsToSummarize();
  // const contentsArray = news?.map((item) => {
  //   return JSON.stringify({
  //     id: item.id,
  //     content: item.content,
  //   });
  // });

  // const openAIDep = CONFIG.isProd ? new Deepseek() : new DeepseekMock();
  // const ai = new Ai(openAIDep);
  // const summarized = await ai.summarizeTexts(contentsArray);

  // const summarizedRepository = new SummarizedNewsRepository();
  // const mapSummarizedNewsToStoreUsecase = new MapSummarizedNewsToStoreUsecase();
  // await Promise.all(
  //   summarized.map(async (item, index) => {
  //     await summarizedRepository.create(mapSummarizedNewsToStoreUsecase.execute(item, news[index]));
  //   })
  // );
};
