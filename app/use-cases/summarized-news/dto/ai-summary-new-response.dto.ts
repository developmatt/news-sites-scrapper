import { RawNewsCategoryEnum } from "../../../../app/enums/raw-news-category.enum";
import { SummarizedNewMoodsEnum } from "../../../../app/enums/summarized-new-moods.enum";

export class AiSummaryNewResponseDto {
  id: string;
  title: string;
  content: string;
  tags: string[];
  categories: RawNewsCategoryEnum[];
  mood: SummarizedNewMoodsEnum;
  success: boolean;
}