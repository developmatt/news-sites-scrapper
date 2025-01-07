import axios from "axios";
import { HomePageNewsLinksExtractorInterface } from "./home-page-news-links-extractor.interface";
import { HtmlManipulator } from "../../../../src/lib/html-manipulator.class";
import { SourcesEnum } from "../../../enums/sources.enum";
import { CONFIG } from "../../../config/config";
import { SOURCES_LINKS } from "../../../config/sources-links";


export class HomePageNewsLinksExtractor implements HomePageNewsLinksExtractorInterface {
  private htmlManipulator: HtmlManipulator;

  constructor(
    private readonly source: SourcesEnum,
    private readonly headlinesLinksSelector: string
  ) {
    this.htmlManipulator = new HtmlManipulator();
  }

  async getPageContent(url: string) {
    return await axios.get(url).then((res) => res.data);
  }

  async extractNewsLinksFromHomePage(homeContent: string, selector: string) {
    this.htmlManipulator.load(homeContent.toString());
    const feedPosts = this.htmlManipulator
      .querySelectorAll(selector)
      .map((_: number, item: any) => {
        return this.htmlManipulator.getAttribute(item, "href");
      });

    const headlinesLinks: string[] = Array.from(new Set(feedPosts)).slice(
      0,
      CONFIG.newsLimitPerSite ?? 5
    ) as string[];

    return headlinesLinks;
  }

  async extract(): Promise<string[]> {
    const homeContent = await this.getPageContent(SOURCES_LINKS[this.source]);
    const headlinesLinks = await this.extractNewsLinksFromHomePage(
      homeContent,
      this.headlinesLinksSelector
    );
    return headlinesLinks;
  }
}
