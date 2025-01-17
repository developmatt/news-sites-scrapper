import { FindManyOptions, FindOptionsWhere } from "typeorm";
import { AppDataSource } from "../../infra/database/data-source";
import { DatabaseInterface } from "../../infra/database/database.interface";
import { CreateSummarizedNewsDto } from "./dto/create-summarized-news.dto";
import { SummarizedNewsEntity } from "./entities/summarized-news.entity";
import { RawNewsCategoryEnum } from "../../enums/raw-news-category.enum";

const repository = AppDataSource.getRepository(SummarizedNewsEntity);

export class SummarizedNewsRepository implements DatabaseInterface {
  async create(
    createSummarizedNewsDto: CreateSummarizedNewsDto
  ): Promise<SummarizedNewsEntity | undefined> {
    try {
      return repository.save(createSummarizedNewsDto);
    } catch (erro) {
      console.error("Erro ao escrever no arquivo:", erro);
      return;
    }
  }

  async findAll(
    options?: FindManyOptions<SummarizedNewsEntity>
  ): Promise<SummarizedNewsEntity[]> {
    return repository.find(options);
  }

  async findOne(entity: Partial<SummarizedNewsEntity>) {
    return repository.findOne({
      where: entity as FindOptionsWhere<SummarizedNewsEntity>
  });
  }

  async getRepository() {
    return repository;
  }

  getHomePageNews = () => {
    const date = new Date(new Date().setHours(0, 0, 0, 0));

    const order: RawNewsCategoryEnum[] = [
      RawNewsCategoryEnum.WORLD,
      RawNewsCategoryEnum.LIFESTYLE,
      RawNewsCategoryEnum.ECONOMY,
      RawNewsCategoryEnum.HEALTH,
      RawNewsCategoryEnum.ENTERTAINMENT,
      RawNewsCategoryEnum.INTERNATIONAL_POLITICS,
      RawNewsCategoryEnum.TECHNOLOGY,
      RawNewsCategoryEnum.POLITICS,
      RawNewsCategoryEnum.CELEBRITIES,
      RawNewsCategoryEnum.SPORTS,
    ];

    const query = repository.createQueryBuilder("summary");

    query.where("summary.createdAt >= :date", { date });

    for (let i = 0; i < order.length; i++) {
      query.addSelect(
        `array_position(summary.categories, :cat${i + 1})`,
        `cat${i + 1}Position`
      );
      query[i === 0 ? "orderBy" : "addOrderBy"](
        `array_position(summary.categories, :cat${i + 1})`,
        "ASC"
      );
    }

    query.setParameters(
      order.reduce(
        (acc: { [key: string]: RawNewsCategoryEnum }, category, index) => {
          acc[`cat${index + 1}`] = category;
          return acc;
        },
        {}
      )
    );

    return query.getMany();
  };
}
