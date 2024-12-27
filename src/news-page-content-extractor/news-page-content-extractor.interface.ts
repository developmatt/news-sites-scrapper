import { RawNewsEntity } from "../repositories/raw-news-repository/entities/raw-news.entity";

export interface NewsPageContentExtractorInterface {
  extract(): Promise<RawNewsEntity>;
}