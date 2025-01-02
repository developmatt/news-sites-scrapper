import { HomePageNewsLinksExtractorInterface } from "./home-page-news-links-extractor/home-page-news-links-extractor.interface";
import { NewsPageContentExtractorInterface } from "./news-page-content-extractor/news-page-content-extractor.interface";
import { StoreUniqueRawNewsUseCase } from "./store-unique-raw-news.use-case";

export class GetLinksExtractContentStoreNewsUseCase {
  constructor(
    private readonly homePageLinkExtractor: HomePageNewsLinksExtractorInterface,
    private readonly contentExtractor: NewsPageContentExtractorInterface,
    private readonly storeUniqueRawNewsUseCase: StoreUniqueRawNewsUseCase
  ) {}

  async execute() {
      const links = await this.homePageLinkExtractor.extract();
    
      await Promise.all(
        links.map(async (link) => {
          try {
            const rawNews = await this.contentExtractor.extract(link);
            await this.storeUniqueRawNewsUseCase.execute(rawNews)
          } catch (e) {
            console.log(e);
          }
        })
      );
  }
}