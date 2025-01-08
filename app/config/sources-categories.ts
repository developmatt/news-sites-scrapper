import { RawNewsCategoryEnum } from "../enums/raw-news-category.enum";
import { SourcesEnum } from "../enums/sources.enum";

export const SourcesCategoriesEnum = {
  [SourcesEnum.G1]: RawNewsCategoryEnum.POLITICS,
  [SourcesEnum.CNN_NEWS]: RawNewsCategoryEnum.POLITICS,
  [SourcesEnum.R7_NEWS]: RawNewsCategoryEnum.POLITICS,
  [SourcesEnum.FDR_FINANCE]: RawNewsCategoryEnum.ECONOMY,
  [SourcesEnum.GLOBO_SPORTS]: RawNewsCategoryEnum.SPORTS,
  [SourcesEnum.ITATIAIA_SPORTS]: RawNewsCategoryEnum.SPORTS,
}