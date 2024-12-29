import fs from "fs";
import { CreateRawNewsDto } from "../../repositories/raw-news-repository/dto/create-raw-news.dto";
import { DatabaseInterface } from "../../infra/database/database.interface";
import { RawNewsEntity } from "../../repositories/raw-news-repository/entities/raw-news.entity";
import { compactText } from "../../utils/compactText";
import { AppDataSource } from "../../infra/database/data-source";
import { SourcesEnum } from "../../enums/sources.enum";
import { RawNewsCategoryEnum } from "../../enums/raw-news-category.enum";

type CreateOptions = {
  retry?: number;
};

const repository = AppDataSource.getRepository(RawNewsEntity);

export class RawNewsRepository implements DatabaseInterface {
  async create(
    createRawNewsDto: CreateRawNewsDto,
    options?: CreateOptions
  ): Promise<RawNewsEntity | undefined> {
    const retry = options?.retry ?? 0;
    try {

      const rawNews = new RawNewsEntity();
      rawNews.title = createRawNewsDto.title;
      rawNews.content = createRawNewsDto.content;
      rawNews.source = createRawNewsDto.source;
      rawNews.rawCategory = createRawNewsDto.category;

      await repository.save(rawNews);
    } catch (erro) {
      if ((retry ?? 1) < 3)
        return this.create(createRawNewsDto, { retry: retry + 1 });
      console.error("Erro ao escrever no arquivo:", erro);
      return;
    }
  }
}
