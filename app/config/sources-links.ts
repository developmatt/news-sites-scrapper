import { SourcesEnum } from "../enums/sources.enum";
import 'dotenv/config';

export const SOURCES_LINKS = {
  [SourcesEnum.G1]: process.env.G1_LINK ?? '',
  [SourcesEnum.CNN_NEWS]: process.env.CNN_NEWS_LINK ?? '',
  [SourcesEnum.R7_NEWS]: process.env.R7_NEWS_LINK ?? '',
  [SourcesEnum.FDR_FINANCE]: process.env.FDR_FINANCE ?? '',
  [SourcesEnum.GLOBO_SPORTS]: process.env.GLOBO_SPORTS ?? '',
  [SourcesEnum.ITATIAIA_SPORTS]: process.env.ITATIAIA_SPORTS ?? '',
  [SourcesEnum.NATURE]: process.env.NATURE ?? '',
}