import { ExtractorInterface } from "../extractor.interface";
import { HtmlManipulator } from "../../lib/html-manipulator.class";
import axios from "axios";
import { DatabaseInterface } from "../../infra/database/database.interface";
import { CreateRawNewsDto } from "../../repositories/raw-news-repository/dto/create-raw-news.dto";
import { CONFIG } from "../../config/config";

export class R7News implements ExtractorInterface {
  private htmlManipulator: HtmlManipulator;

  constructor(private readonly rawNewsDatabase: DatabaseInterface) {
    this.htmlManipulator = new HtmlManipulator();
  }

  async extract() {
    const homeContent = await axios
      .get("https://noticias.r7.com/")
      .then((res) => res.data);

    this.htmlManipulator.load(homeContent.toString());
    const feedPosts = this.htmlManipulator
      .querySelectorAll("article a")
      .map((_: number, item: any) => {
        return this.htmlManipulator.getAttribute(item, "href");
      });
    const headlinesLinks: string[] = Array.from(new Set(feedPosts)).slice(
      0,
      CONFIG.newsLimitPerSite ?? 5
    ) as string[];

    for await (const link of headlinesLinks) {
      const pageContent = await axios.get(link).then((res) => res.data);
      this.htmlManipulator.load(pageContent.toString());

      const title = this.htmlManipulator.getText(
        this.htmlManipulator.querySelectorAll("h1")[0]
      );
      const content = this.htmlManipulator.getText(
        this.htmlManipulator.querySelectorAll("article")[0]
      );

      const createRawNewsDto: CreateRawNewsDto = {
        title,
        content,
      };

      await this.rawNewsDatabase.create(createRawNewsDto);
    }
  }
}
