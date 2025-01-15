import axios from "axios";
import { HomePageNewsLinksExtractorInterface } from "./home-page-news-links-extractor.interface";
import { SourcesEnum } from "../../../enums/sources.enum";
import { CONFIG } from "../../../config/config";
import { SOURCES_LINKS } from "../../../config/sources-links";
import { HtmlManipulator } from "../../../lib/html-manipulator.class";


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

  buildUrlSimpleWay(supposedUrl: string): string {
    const url = new URL(supposedUrl)
    return url.href
  }

  buildUrlJoiningSourceAndFoundLink(supposedUrl: string): string {
    const originSource = new URL(SOURCES_LINKS[this.source])
    const preBuild = `${originSource.origin}${supposedUrl}`
    const finalUrl = new URL(preBuild)
    return finalUrl.href
  }

  //retry limit = 2
  buildValidUrl(supposedUrl: string, retryTime: number = 0): string {
    try {
      const factory = [
        this.buildUrlSimpleWay,
        this.buildUrlJoiningSourceAndFoundLink.bind(this),
        () => supposedUrl
      ]

      return factory[retryTime](supposedUrl)
      
    } catch {
      return this.buildValidUrl(supposedUrl, retryTime + 1)
    }
  }

  async extractNewsLinksFromHomePage(homeContent: string, selector: string) {
    this.htmlManipulator.load(homeContent.toString());
    const feedPosts = this.htmlManipulator
      .querySelectorAll(selector)
      .map((_: number, item: Element) => {
        const att = this.htmlManipulator.getAttribute(item, "href");
        return this.buildValidUrl(att)
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
