import fs from "fs";
import { CreateRawNewsDto } from "../../repositories/raw-news-repository/dto/create-raw-news.dto";
import { DatabaseInterface } from "../../infra/database/database.interface";
import { RawNewsEntity } from "../../repositories/raw-news-repository/entities/raw-news.entity";
import { compactText } from "../../utils/compactText";

const BASE_DIR = "storage/g1/raw";

type CreateOptions = {
  retry?: number;
};

export class RawNewsRepository implements DatabaseInterface {
  constructor(
    private readonly database: DatabaseInterface,
    private readonly baseDir: string
  ) {}

  async create(
    createRawNewsDto: CreateRawNewsDto,
    options?: CreateOptions
  ): Promise<RawNewsEntity | undefined> {
    const retry = options?.retry ?? 0;
    try {
      const fileName = `${this.baseDir}/${createRawNewsDto.title.replace(
        / /g,
        "_"
      )}.txt`;

      await this.database.create(fileName, compactText(createRawNewsDto.content));
    } catch (erro) {
      if ((retry ?? 1) < 3)
        return this.create(createRawNewsDto, { retry: retry + 1 });
      console.error("Erro ao escrever no arquivo:", erro);
      return;
    }
  }
}
