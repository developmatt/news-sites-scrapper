import { FindManyOptions } from "typeorm";
import { AppDataSource } from "../../infra/database/data-source";
import { DatabaseInterface } from "../../infra/database/database.interface";
import { CreateSummarizedNewsDto } from "./dto/create-summarized-news.dto";
import { SummarizedNewsEntity } from "./entities/summarized-news.entity";

const repository = AppDataSource.getRepository(SummarizedNewsEntity);

export class SummarizedNewsRepository implements DatabaseInterface {
  async create(createSummarizedNewsDto: CreateSummarizedNewsDto): Promise<SummarizedNewsEntity | undefined> {
    try {
      return repository.save(createSummarizedNewsDto);
    } catch (erro) {
      console.error("Erro ao escrever no arquivo:", erro);
      return;
    }
  }

  async findAll(options?: FindManyOptions<SummarizedNewsEntity>): Promise<SummarizedNewsEntity[]> {
    return repository.find(options);
  }

  async getRepository() {
    return repository;
  }
}