import { ExtractedRawNewsDto } from "../../../repositories/raw-news-repository/dto/extracted-raw-news.dto";

export interface NewsPageContentExtractorInterface {
  extract(url: string): Promise<ExtractedRawNewsDto>;
}