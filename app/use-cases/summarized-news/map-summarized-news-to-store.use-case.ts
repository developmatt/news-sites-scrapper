import { RawNews } from "@prisma/client";
import { RawNewsCategoryEnum } from "../../../app/enums/raw-news-category.enum";
import { SummarizedNewMoodsEnum } from "../../../app/enums/summarized-new-moods.enum";
import { AiSummaryNewResponseDto } from "./dto/ai-summary-new-response.dto";
import { CreateSummarizedNewsDto } from "./dto/create-summarized-news.dto";

export class MapSummarizedNewsToStoreUsecase {
  execute(summarizedResponse: AiSummaryNewResponseDto, correspondingRawNew: RawNews): CreateSummarizedNewsDto {
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
      rawNewsId: correspondingRawNew.id!,
    }
  }
}