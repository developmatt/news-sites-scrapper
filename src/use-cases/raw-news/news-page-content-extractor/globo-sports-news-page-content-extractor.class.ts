import { SourcesCategoriesEnum } from "../../../config/sources-categories";
import { SourcesEnum } from "../../../enums/sources.enum";
import { compactText } from "../../../utils/compactText";
import { ExtractedRawNewsDto } from "../dto/extracted-raw-news.dto";
import { NewsPageContentExtractor } from "./news-page-content-extractor.class";

export class GloboSportsNewsPageContentExtractor extends NewsPageContentExtractor {
  constructor(
    source: SourcesEnum,
    titleSelector: string,
    contentSelector: string | string[]
  ) {
    super(source, titleSelector, contentSelector);
  }

  getNewsContent(selector: string) {
    return this.htmlManipulator.getText(
      this.htmlManipulator.querySelectorAll(selector)[0]
    );
  }
  
  async extract(url: string): Promise<ExtractedRawNewsDto> {
    const pageContent = await this.getPageContent(url);
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