import { Ai } from "./core/ai/ai.class";
import { HomePageNewsLinksExtractor } from "./core/home-page-news-links-extractor/home-page-news-links-extractor.class";
import { NewsPageContentExtractor } from "./core/news-page-content-extractor/news-page-content-extractor.class";
import { SourcesEnum } from "./enums/sources.enum";
import { OpenAI } from "./lib/open-ai.class";
import { LocalStorer } from "./lib/storer/local-storer.class";
import { RawNewsRepository } from "./repositories/raw-news-repository/raw-news-repository.repository";


let news: string[] = []


async function start() {
  //TODO: Go to home page
  //TODO: Read the home page news and store their page links
  //TODO: Go to each page and store the news content
  //TODO: Get the news content and send to the API
  //Remember to ask for tags

  //TODO: Save the response in database
  //TODO: Call the endpoint to update the news


  const localStorerDatabase = new LocalStorer();

  const cnnRawRepository = new RawNewsRepository(localStorerDatabase, "storage/cnnnews/raw");
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
      news.push(rawNews.content)
      await cnnRawRepository.create(rawNews);
    })
  );

  const g1RawRepository = new RawNewsRepository(localStorerDatabase, "storage/g1/raw");
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
      news.push(rawNews.content)
      await g1RawRepository.create(rawNews);
    })
  );

  const r7RawRepository = new RawNewsRepository(localStorerDatabase, "storage/r7/raw");
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
      news.push(rawNews.content)
      await r7RawRepository.create(rawNews);
    })
  );
}

async function ai(news: string[]) {
  const aiClass = new Ai(new OpenAI())
  const result = await aiClass.summarizeTexts(news)
  console.log(JSON.parse(result))
}


start()
  .then(() => ai(news))
