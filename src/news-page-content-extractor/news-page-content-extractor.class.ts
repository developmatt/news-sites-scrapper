import axios from "axios";
import { RawNewsEntity } from "../repositories/raw-news-repository/entities/raw-news.entity";
import { NewsPageContentExtractorInterface } from "./news-page-content-extractor.interface";
import { HtmlManipulator } from "../lib/html-manipulator.class";

export class NewsPageContentExtractor implements NewsPageContentExtractorInterface {
  private htmlManipulator: HtmlManipulator;
  constructor(
    private readonly url: string,
    private readonly titleSelector: string,
    private readonly contentSelector: string
  
  ) {
    this.htmlManipulator = new HtmlManipulator();
  }

  async getPageContent(url: string) {
    return await axios
      .get(url)
      .then((res) => res.data);
  }

  getNewsTitle(selector: string) {
    return this.htmlManipulator.getText(
      this.htmlManipulator.querySelectorAll(selector)[0]
    );
  }

  getNewsContent(selector: string) {
    return this.htmlManipulator.getText(
      this.htmlManipulator.querySelectorAll(selector)[0]
    );
  }
  
  async extract(): Promise<RawNewsEntity> {
    const pageContent = await this.getPageContent(this.url);
    this.htmlManipulator.load(pageContent.toString());

    const title = this.getNewsTitle(this.titleSelector);
    const content = this.getNewsContent(this.contentSelector);

    const rawNewsEntity: RawNewsEntity = {
      title,
      content,
    }

    return rawNewsEntity;
  }
}