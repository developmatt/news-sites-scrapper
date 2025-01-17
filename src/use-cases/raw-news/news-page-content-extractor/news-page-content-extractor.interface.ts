import { ExtractedRawNewsDto } from "../dto/extracted-raw-news.dto";

export interface NewsPageContentExtractorInterface {
  extract(url: string): Promise<ExtractedRawNewsDto>;
}