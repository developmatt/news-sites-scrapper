import { GetHomePageNewsUseCase } from "../use-cases/summarized-news/get-home-page-news.use-case";
import { SummarizedNewsRepository } from "../use-cases/summarized-news/summarized-news-repository.repository";

export const getHomePageNewsAction = async () => {
  try {
    const repository = new SummarizedNewsRepository()
    const getHomePageNewsUseCase = new GetHomePageNewsUseCase(repository);
    const summarizedNews = await getHomePageNewsUseCase.execute();
    return summarizedNews;
  } catch (error) {
    console.error(error);
    return [];
  }
};
