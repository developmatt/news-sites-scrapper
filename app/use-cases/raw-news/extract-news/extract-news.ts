import { RawNewsRepository } from "@/app/use-cases/raw-news/raw-news-repository.repository";
import { SourcesEnum } from "../../../enums/sources.enum";
import { GetLinksExtractContentStoreNewsUseCase } from "../get-links-extract-content-store-news.use-case";
import { HomePageNewsLinksExtractor } from "../home-page-news-links-extractor/home-page-news-links-extractor.class";
import { NewsPageContentExtractor } from "../news-page-content-extractor/news-page-content-extractor.class";
import { StoreUniqueRawNewsUseCase } from "../store-unique-raw-news.use-case";
import { NYTimesNewsPageContentExtractor } from "../news-page-content-extractor/nytimes-news-page-content-extractor.class";

export const extractNews = async () => {
  const rawNewsRepository = new RawNewsRepository();
  const storeUniqueRawNewsUseCase = new StoreUniqueRawNewsUseCase(
    rawNewsRepository
  );

  const crawlers = []

  //NY Times Health
  crawlers.push(new GetLinksExtractContentStoreNewsUseCase(
    new HomePageNewsLinksExtractor(
      SourcesEnum.NY_TIMES_HEALTH,
      "#collection-highlights-container a"
    ),
    new NYTimesNewsPageContentExtractor(SourcesEnum.NY_TIMES_HEALTH, "h1", "main [name=articleBody]"),
    storeUniqueRawNewsUseCase
  ).execute())

  //Nature
  crawlers.push(new GetLinksExtractContentStoreNewsUseCase(
    new HomePageNewsLinksExtractor(
      SourcesEnum.NATURE,
      ".c-card a"
    ),
    new NewsPageContentExtractor(SourcesEnum.NATURE, "h1", "main"),
    storeUniqueRawNewsUseCase
  ).execute())

  //BBC World News
  crawlers.push(new GetLinksExtractContentStoreNewsUseCase(
    new HomePageNewsLinksExtractor(
      SourcesEnum.BBC_WORLD_NEWS,
      "main [data-testid=internal-link]"
    ),
    new NewsPageContentExtractor(SourcesEnum.BBC_WORLD_NEWS, "h1", "article"),
    storeUniqueRawNewsUseCase
  ).execute())

  //Itatiaia Sports
  // crawlers.push(new GetLinksExtractContentStoreNewsUseCase(
  //   new HomePageNewsLinksExtractor(
  //     SourcesEnum.ITATIAIA_SPORTS,
  //     ".PageList-items a"
  //   ),
  //   new NewsPageContentExtractor(SourcesEnum.ITATIAIA_SPORTS, "h1", "main"),
  //   storeUniqueRawNewsUseCase
  // ).execute())

  // //Globo sports
  // crawlers.push(new GetLinksExtractContentStoreNewsUseCase(
  //   new HomePageNewsLinksExtractor(
  //     SourcesEnum.GLOBO_SPORTS,
  //     ".feed-post-body-title a"
  //   ),
  //   new GloboSportsNewsPageContentExtractor(
  //     SourcesEnum.GLOBO_SPORTS,
  //     "h1",
  //     "article"
  //   ),
  //   storeUniqueRawNewsUseCase
  // ).execute())

  //Finance
  crawlers.push(new GetLinksExtractContentStoreNewsUseCase(
    new HomePageNewsLinksExtractor(SourcesEnum.FDR_FINANCE, "article > a"),
    new NewsPageContentExtractor(SourcesEnum.FDR_FINANCE, "h1", "article"),
    storeUniqueRawNewsUseCase
  ).execute())

  // //Politics
  // crawlers.push(new GetLinksExtractContentStoreNewsUseCase(
  //   new HomePageNewsLinksExtractor(
  //     SourcesEnum.CNN_NEWS,
  //     ".home__list__item a"
  //   ),
  //   new NewsPageContentExtractor(
  //     SourcesEnum.CNN_NEWS,
  //     ".single-header__title",
  //     "article"
  //   ),
  //   storeUniqueRawNewsUseCase
  // ).execute())

  // crawlers.push(new GetLinksExtractContentStoreNewsUseCase(
  //   new HomePageNewsLinksExtractor(SourcesEnum.G1, ".feed-post a"),
  //   new NewsPageContentExtractor(
  //     SourcesEnum.G1,
  //     ".content-head__title",
  //     "article"
  //   ),
  //   storeUniqueRawNewsUseCase
  // ).execute())

  // crawlers.push(new GetLinksExtractContentStoreNewsUseCase(
  //   new HomePageNewsLinksExtractor(SourcesEnum.R7_NEWS, "article a"),
  //   new NewsPageContentExtractor(SourcesEnum.R7_NEWS, "h1", "article"),
  //   storeUniqueRawNewsUseCase
  // ).execute())

  return await Promise.all(crawlers);
};
