import { RawNewsCategoryEnum } from "../../../enums/raw-news-category.enum";
import { SummarizedNewMoodsEnum } from "../../../enums/summarized-new-moods.enum";

export class CreateSummarizedNewsDto {
  title: string;
  content: string;
  tags: string[];
  categories: RawNewsCategoryEnum[];
  mood: SummarizedNewMoodsEnum;
  rawNewsId: string;
}