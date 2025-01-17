import { SummarizedNewsRepository } from "../../summarized-news/summarized-news-repository.repository";

export const getHomePageNews = async () => {
  const summarizedRepository = new SummarizedNewsRepository();
  return summarizedRepository.getHomePageNews()
}