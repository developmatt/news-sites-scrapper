import { SummarizedNewsRepository } from "../../../repositories/summarized-news-repository/summarized-news-repository.repository";

export const getHomePageNews = async () => {
  const summarizedRepository = new SummarizedNewsRepository();
  return summarizedRepository.getHomePageNews()
}