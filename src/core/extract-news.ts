import { SourcesEnum } from "../enums/sources.enum";
import { RawNewsRepository } from "../repositories/raw-news-repository/raw-news-repository.repository";
import { compactText } from "../utils/compactText";
import { HomePageNewsLinksExtractor } from "./home-page-news-links-extractor/home-page-news-links-extractor.class";
import { NewsPageContentExtractor } from "./news-page-content-extractor/news-page-content-extractor.class";

export const extractNews = async () => {
  const rawNewsRepository = new RawNewsRepository();
  const cnnHomeLinks = new HomePageNewsLinksExtractor(
    SourcesEnum.CNN_NEWS,
    ".home__list__item a"
  );

  const cnnLinks = await cnnHomeLinks.extract();

  await Promise.all(
    cnnLinks.map(async (link) => {
      const cnnNewsRawContentExtractor = new NewsPageContentExtractor(
        link,
        SourcesEnum.CNN_NEWS,
        ".single-header__title",
        "article"
      );
      const rawNews = await cnnNewsRawContentExtractor.extract();
      await rawNewsRepository.create(rawNews);
    })
  );

  const g1HomeLinks = new HomePageNewsLinksExtractor(
    SourcesEnum.G1,
    ".feed-post a"
  );

  const g1Links = await g1HomeLinks.extract();

  await Promise.all(
    g1Links.map(async (link) => {
      const g1NewsRawContentExtractor = new NewsPageContentExtractor(
        link,
        SourcesEnum.G1,
        ".content-head__title",
        "article"
      );
      const rawNews = await g1NewsRawContentExtractor.extract();
      await rawNewsRepository.create(rawNews);
    })
  );

  const r7HomeLinks = new HomePageNewsLinksExtractor(
    SourcesEnum.R7_NEWS,
    "article a"
  );

  const r7Links = await r7HomeLinks.extract();

  await Promise.all(
    r7Links.map(async (link) => {
      const r7NewsRawContentExtractor = new NewsPageContentExtractor(
        link,
        SourcesEnum.R7_NEWS,
        "h1",
        "article"
      );
      const rawNews = await r7NewsRawContentExtractor.extract();
      console.log(">>>rawnews")
      console.log(rawNews)
      await rawNewsRepository.create({
        ...rawNews,
        content: compactText(rawNews.content)
      });
    })
  );
}