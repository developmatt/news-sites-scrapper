import axios from "axios";
import { RawNewsEntity } from "../repositories/raw-news-repository/entities/raw-news.entity";
import { NewsPageContentExtractorInterface } from "./news-page-content-extractor.interface";
import { HtmlManipulator } from "../lib/html-manipulator.class";
import { NewsPageContentExtractor } from "./news-page-content-extractor.class";

export class CnnNewsPageContentExtractor extends NewsPageContentExtractor {
  constructor(url: string) {
    super(url, ".single-header__title", "article");
  }
}
