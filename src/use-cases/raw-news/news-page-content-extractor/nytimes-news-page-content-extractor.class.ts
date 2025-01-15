import axios from "axios";
import { SourcesEnum } from "../../../enums/sources.enum";
import { NewsPageContentExtractor } from "./news-page-content-extractor.class";

export class NYTimesNewsPageContentExtractor extends NewsPageContentExtractor {
  constructor(
    protected readonly source: SourcesEnum,
    protected readonly titleSelector: string,
    protected readonly contentSelector: string | string[]
  ) {
    super(source, titleSelector, contentSelector);
  }

  async getPageContent(url: string) {
    return await axios
      .get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
          'Connection': 'keep-alive',
        }
      })
      .then((res) => res.data);
  }

}