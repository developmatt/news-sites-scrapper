import { getManager } from "typeorm";
import { RawNewsCategoryEnum } from "../../enums/raw-news-category.enum";
import { AppDataSource } from "../../infra/database/data-source";
import { SummarizedNewsEntity } from "../../repositories/summarized-news-repository/entities/summarized-news.entity";
import { CreateSummarizedNewsDto } from "./dto/create-summarized-news.dto";

const repository = AppDataSource.getRepository(SummarizedNewsEntity);

export class SummarizedNewsRepository {
  async create(
    data: CreateSummarizedNewsDto
  ): Promise<SummarizedNewsEntity | undefined> {
    try {
      return repository.save(data);
    } catch (erro) {
      console.error("Erro ao escrever no arquivo:", erro);
      return;
    }
  }

  async findBy(
    options: any
  ): Promise<SummarizedNewsEntity[]> {
    return await repository.find(options);
  }

  async findOne(
    options: any
  ): Promise<SummarizedNewsEntity | null> {
    return repository.findOne(options);
  }

  async findMany(
    options: any
  ): Promise<SummarizedNewsEntity[]> {
    return repository.find(options);
  }

  async getHomePageNews(): Promise<SummarizedNewsEntity[]> {
    try {
      const date = new Date(new Date().setHours(0, 0, 0, 0));

      const order: RawNewsCategoryEnum[] = [
        RawNewsCategoryEnum.HEALTH,
        RawNewsCategoryEnum.WORLD,
        RawNewsCategoryEnum.LIFESTYLE,
        RawNewsCategoryEnum.ECONOMY,
        RawNewsCategoryEnum.ENTERTAINMENT,
        RawNewsCategoryEnum.INTERNATIONAL_POLITICS,
        RawNewsCategoryEnum.TECHNOLOGY,
        RawNewsCategoryEnum.POLITICS,
        RawNewsCategoryEnum.CELEBRITIES,
        RawNewsCategoryEnum.SPORTS,
      ];

      const manager = getManager();

      const q: SummarizedNewsEntity[] = await manager.query(`
        SELECT * FROM "SummarizedNews"
        WHERE "createdAt" >= ${date}
        ORDER BY
        ${order
          .map((category) => `array_position(categories, ${category}) ASC,`)
          .join("\n")}
      `);

      return q;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
