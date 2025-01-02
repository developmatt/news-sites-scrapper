import axios from "axios";
import { RawNewsEntity } from "../../repositories/raw-news-repository/entities/raw-news.entity";
import { NewsPageContentExtractorInterface } from "./news-page-content-extractor.interface";
import { HtmlManipulator } from "../../lib/html-manipulator.class";
import { SourcesEnum } from "../../enums/sources.enum";
import { ExtractedRawNewsDto } from "../../repositories/raw-news-repository/dto/extracted-raw-news.dto";
import { SourcesCategoriesEnum } from "../../config/sources-categories";
import { compactText } from "../../utils/compactText";

export class NewsPageContentExtractor implements NewsPageContentExtractorInterface {
  protected htmlManipulator: HtmlManipulator;
  constructor(
    protected readonly url: string,
    protected readonly source: SourcesEnum,
    protected readonly titleSelector: string,
    protected readonly contentSelector: string | string[]
  
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
  
  async extract(): Promise<ExtractedRawNewsDto> {
    const pageContent = await this.getPageContent(this.url);
    this.htmlManipulator.load(pageContent.toString());

    const title = this.getNewsTitle(this.titleSelector);

    let content = '';

    if(this.contentSelector instanceof Array) {
      for(let i = 0; i < this.contentSelector.length; i++) {
        const contentFoundUncompacted = this.getNewsContent(this.contentSelector[i]);
        const contentFound = compactText(contentFoundUncompacted);
        if(contentFound.length > 100) {
          content = contentFound;
          break;
        }
      }
    } else {
      content = compactText(this.getNewsContent(this.contentSelector));
    }

    const rawNewsEntity: ExtractedRawNewsDto = {
      title,
      content,
      source: this.source,
      category: SourcesCategoriesEnum[this.source]
    }

    return rawNewsEntity;
  }
}