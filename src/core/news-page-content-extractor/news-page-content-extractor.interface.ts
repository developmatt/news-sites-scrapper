import { ExtractedRawNewsDto } from "../../repositories/raw-news-repository/dto/extracted-raw-news.dto";

export interface NewsPageContentExtractorInterface {
  extract(): Promise<ExtractedRawNewsDto>;
}