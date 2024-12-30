import axios from "axios";
import { RawNewsEntity } from "../../repositories/raw-news-repository/entities/raw-news.entity";
import { NewsPageContentExtractorInterface } from "./news-page-content-extractor.interface";
import { HtmlManipulator } from "../../lib/html-manipulator.class";
import { SourcesEnum } from "../../enums/sources.enum";
import { ExtractedRawNewsDto } from "../../repositories/raw-news-repository/dto/extracted-raw-news.dto";
import { SourcesCategoriesEnum } from "../../config/sources-categories";
import { compactText } from "../../utils/compactText";
import { NewsPageContentExtractor } from "./news-page-content-extractor.class";

export class GloboSportsNewsPageContentExtractor extends NewsPageContentExtractor {
  constructor(
    url: string,
    source: SourcesEnum,
    titleSelector: string,
    contentSelector: string | string[]
  ) {
    super(url, source, titleSelector, contentSelector);
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
        const contentFound = this.getNewsContent(this.contentSelector[i]);
        console.log(">>>>>selector", this.contentSelector[i])
        console.log('contentFound', contentFound, compactText(contentFound).length)
        if(compactText(contentFound).length > 100) {
          content = contentFound;
          break;
        }
      }
    } else {
      content = this.getNewsContent(this.contentSelector);
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