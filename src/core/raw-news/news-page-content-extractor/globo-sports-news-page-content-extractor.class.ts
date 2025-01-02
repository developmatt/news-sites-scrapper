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

    if(!content) throw new Error('Content not found');

    const rawNewsEntity: ExtractedRawNewsDto = {
      title,
      content: compactText(content),
      source: this.source,
      category: SourcesCategoriesEnum[this.source]
    }

    return rawNewsEntity;
  }
}