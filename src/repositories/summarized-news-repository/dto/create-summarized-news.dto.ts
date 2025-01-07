import { RawNewsCategoryEnum } from "../../../../app/enums/raw-news-category.enum";
import { SummarizedNewMoodsEnum } from "../../../../app/enums/summarized-new-moods.enum";
import { RawNewsEntity } from "../../../../app/use-cases/raw-news/entities/raw-news.entity";

export class CreateSummarizedNewsDto {
  title: string;
  content: string;
  tags: string[];
  categories: RawNewsCategoryEnum[];
  mood: SummarizedNewMoodsEnum;
  rawNews: RawNewsEntity;
}