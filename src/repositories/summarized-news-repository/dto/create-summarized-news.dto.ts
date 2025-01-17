import { RawNewsCategoryEnum } from "../../../enums/raw-news-category.enum";
import { SummarizedNewMoodsEnum } from "../../../enums/summarized-new-moods.enum";
import { RawNewsEntity } from "../../raw-news-repository/entities/raw-news.entity";

export class CreateSummarizedNewsDto {
  title: string;
  content: string;
  tags: string[];
  categories: RawNewsCategoryEnum[];
  mood: SummarizedNewMoodsEnum;
  rawNews: RawNewsEntity;
}