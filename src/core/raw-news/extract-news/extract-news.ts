import { SourcesEnum } from "../../../enums/sources.enum";
import { RawNewsRepository } from "../../../repositories/raw-news-repository/raw-news-repository.repository";
import { HomePageNewsLinksExtractor } from "../home-page-news-links-extractor/home-page-news-links-extractor.class";
import { GloboSportsNewsPageContentExtractor } from "../news-page-content-extractor/globo-sports-news-page-content-extractor.class";
import { NewsPageContentExtractor } from "../news-page-content-extractor/news-page-content-extractor.class";
import { StoreUniqueRawNewsUseCase } from "../store-unique-raw-news.use-case";

export const extractNews = async () => {
  const rawNewsRepository = new RawNewsRepository();
  const storeUniqueRawNewsUseCase = new StoreUniqueRawNewsUseCase(rawNewsRepository);

  //SPORTS
  const itatiaiaSports = new HomePageNewsLinksExtractor(
    SourcesEnum.ITATIAIA_SPORTS,
    ".PageList-items a"
  );

  const itatiaiaLinks = await itatiaiaSports.extract();

  await Promise.all(
    itatiaiaLinks.map(async (link) => {
      try {
        const contentExtractor = new NewsPageContentExtractor(
          link,
          SourcesEnum.GLOBO_SPORTS,
          "h1",
          "main"
        );
        const rawNews = await contentExtractor.extract();
        await storeUniqueRawNewsUseCase.execute(rawNews)
      } catch (e) {
        console.log(e);
      }
    })
  );

  const globoSports = new HomePageNewsLinksExtractor(
    SourcesEnum.GLOBO_SPORTS,
    ".feed-post-body-title a"
  );

  const globoSportsLinks = await globoSports.extract();

  await Promise.all(
    globoSportsLinks.map(async (link) => {
      try {
        const contentExtractor = new GloboSportsNewsPageContentExtractor(
          link,
          SourcesEnum.GLOBO_SPORTS,
          "h1",
          "article"
        );
        const rawNews = await contentExtractor.extract();
        await storeUniqueRawNewsUseCase.execute(rawNews)
        
      } catch (e) {
        console.log(e);
      }
    })
  );

  //FINANCE
  const fdrFinance = new HomePageNewsLinksExtractor(
    SourcesEnum.FDR_FINANCE,
    "article > a"
  );

  const fdrLinks = await fdrFinance.extract();

  await Promise.all(
    fdrLinks.map(async (link) => {
      try {
        const contentExtractor = new NewsPageContentExtractor(
          link,
          SourcesEnum.FDR_FINANCE,
          "h1",
          "article"
        );
        const rawNews = await contentExtractor.extract();
        await storeUniqueRawNewsUseCase.execute(rawNews)
      } catch (e) {
        console.log(e);
      }
    })
  );

  // //Politics
  const cnnHomeLinks = new HomePageNewsLinksExtractor(
    SourcesEnum.CNN_NEWS,
    ".home__list__item a"
  );

  const cnnLinks = await cnnHomeLinks.extract();

  await Promise.all(
    cnnLinks.map(async (link) => {
      try {
        const cnnNewsRawContentExtractor = new NewsPageContentExtractor(
          link,
          SourcesEnum.CNN_NEWS,
          ".single-header__title",
          "article"
        );
        const rawNews = await cnnNewsRawContentExtractor.extract();
        await storeUniqueRawNewsUseCase.execute(rawNews)
      } catch (e) {
        console.log(e);
      }
    })
  );

  const g1HomeLinks = new HomePageNewsLinksExtractor(
    SourcesEnum.G1,
    ".feed-post a"
  );

  const g1Links = await g1HomeLinks.extract();

  await Promise.all(
    g1Links.map(async (link) => {
      try {
        const g1NewsRawContentExtractor = new NewsPageContentExtractor(
          link,
          SourcesEnum.G1,
          ".content-head__title",
          "article"
        );
        const rawNews = await g1NewsRawContentExtractor.extract();
        await storeUniqueRawNewsUseCase.execute(rawNews)
      } catch (e) {
        console.log(e);
      }
    })
  );

  const r7HomeLinks = new HomePageNewsLinksExtractor(
    SourcesEnum.R7_NEWS,
    "article a"
  );

  const r7Links = await r7HomeLinks.extract();

  await Promise.all(
    r7Links.map(async (link) => {
      try {
        const r7NewsRawContentExtractor = new NewsPageContentExtractor(
          link,
          SourcesEnum.R7_NEWS,
          "h1",
          "article"
        );
        const rawNews = await r7NewsRawContentExtractor.extract();
        await storeUniqueRawNewsUseCase.execute(rawNews)
      } catch (e) {
        console.log(e);
      }
    })
  );
};
