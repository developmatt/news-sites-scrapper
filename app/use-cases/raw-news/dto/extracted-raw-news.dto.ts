import { RawNewsCategoryEnum } from "../../../enums/raw-news-category.enum";
import { SourcesEnum } from "../../../enums/sources.enum";

export interface ExtractedRawNewsDto {
  title: string;
  content: string;
  source: SourcesEnum;
  category: RawNewsCategoryEnum;
}