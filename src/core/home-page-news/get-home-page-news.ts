import { SummarizedNewsRepository } from "../../repositories/summarized-news-repository/summarized-news-repository.repository";
import { RawNewsCategoryEnum } from "../../enums/raw-news-category.enum";

export const getHomePageNews = async () => {
  const summarizedRepository = new SummarizedNewsRepository();
  return summarizedRepository.getHomePageNews()
}