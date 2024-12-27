import { HomePageNewsLinksExtractor } from "./home-page-news-links-extractor.class";

export class CnnHomePageNewsLinksExtractor extends HomePageNewsLinksExtractor {
  constructor() {
    super("https://www.cnnbrasil.com.br/politica/", ".home__list__item a");
  }
}
