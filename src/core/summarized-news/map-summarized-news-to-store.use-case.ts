import { RawNewsCategoryEnum } from "../../../app/enums/raw-news-category.enum";
import { SummarizedNewMoodsEnum } from "../../../app/enums/summarized-new-moods.enum";
import { RawNewsEntity } from "../../../app/use-cases/raw-news/entities/raw-news.entity";
import { AiSummaryNewResponseDto } from "../../repositories/summarized-news-repository/dto/ai-summary-new-response.dto";
import { CreateSummarizedNewsDto } from "../../repositories/summarized-news-repository/dto/create-summarized-news.dto";

export class MapSummarizedNewsToStoreUsecase {
  execute(summarizedResponse: AiSummaryNewResponseDto, correspondingRawNew: RawNewsEntity): CreateSummarizedNewsDto {
    return {
      title: summarizedResponse.title,
      content: summarizedResponse.content,
      tags: summarizedResponse.tags,
      categories: summarizedResponse.categories.map(
        (category) =>
          RawNewsCategoryEnum[
            category
              .toUpperCase()
              .replace(
                /\s+/g,
                "_"
              ) as unknown as keyof typeof RawNewsCategoryEnum
          ]
      ),
      mood: SummarizedNewMoodsEnum[
        summarizedResponse.mood.toUpperCase() as keyof typeof SummarizedNewMoodsEnum
      ],
      rawNews: correspondingRawNew,
    }
  }
}