import { SourcesEnum } from "../../../enums/sources.enum";
import { RawNewsRepository } from "../../../repositories/raw-news-repository/raw-news-repository.repository";
import { GetLinksExtractContentStoreNewsUseCase } from "../get-links-extract-content-store-news.use-case";
import { HomePageNewsLinksExtractor } from "../home-page-news-links-extractor/home-page-news-links-extractor.class";
import { GloboSportsNewsPageContentExtractor } from "../news-page-content-extractor/globo-sports-news-page-content-extractor.class";
import { NewsPageContentExtractor } from "../news-page-content-extractor/news-page-content-extractor.class";
import { StoreUniqueRawNewsUseCase } from "../store-unique-raw-news.use-case";

export const extractNews = async () => {
  const rawNewsRepository = new RawNewsRepository();
  const storeUniqueRawNewsUseCase = new StoreUniqueRawNewsUseCase(
    rawNewsRepository
  );

  //SPORTS
  new GetLinksExtractContentStoreNewsUseCase(
    new HomePageNewsLinksExtractor(
      SourcesEnum.ITATIAIA_SPORTS,
      ".PageList-items a"
    ),
    new NewsPageContentExtractor(SourcesEnum.ITATIAIA_SPORTS, "h1", "main"),
    storeUniqueRawNewsUseCase
  ).execute();

  new GetLinksExtractContentStoreNewsUseCase(
    new HomePageNewsLinksExtractor(
      SourcesEnum.GLOBO_SPORTS,
      ".feed-post-body-title a"
    ),
    new GloboSportsNewsPageContentExtractor(
      SourcesEnum.GLOBO_SPORTS,
      "h1",
      "article"
    ),
    storeUniqueRawNewsUseCase
  ).execute();

  //FINANCE

  new GetLinksExtractContentStoreNewsUseCase(
    new HomePageNewsLinksExtractor(SourcesEnum.FDR_FINANCE, "article > a"),
    new NewsPageContentExtractor(SourcesEnum.FDR_FINANCE, "h1", "article"),
    storeUniqueRawNewsUseCase
  ).execute();

  //POLITICS

  new GetLinksExtractContentStoreNewsUseCase(
    new HomePageNewsLinksExtractor(SourcesEnum.CNN_NEWS, ".home__list__item a"),
    new NewsPageContentExtractor(
      SourcesEnum.CNN_NEWS,
      ".single-header__title",
      "article"
    ),
    storeUniqueRawNewsUseCase
  ).execute();

  new GetLinksExtractContentStoreNewsUseCase(
    new HomePageNewsLinksExtractor(SourcesEnum.G1, ".feed-post a"),
    new NewsPageContentExtractor(
      SourcesEnum.G1,
      ".content-head__title",
      "article"
    ),
    storeUniqueRawNewsUseCase
  ).execute();

  new GetLinksExtractContentStoreNewsUseCase(
    new HomePageNewsLinksExtractor(SourcesEnum.R7_NEWS, "article a"),
    new NewsPageContentExtractor(SourcesEnum.R7_NEWS, "h1", "article"),
    storeUniqueRawNewsUseCase
  ).execute();
};
