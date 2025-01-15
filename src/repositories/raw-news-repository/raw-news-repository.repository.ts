import { CreateRawNewsDto } from "./dto/create-raw-news.dto";
import { DatabaseInterface } from "../../infra/database/database.interface";
import { RawNewsEntity } from "./entities/raw-news.entity";
import { AppDataSource } from "../../infra/database/data-source";
import { SummarizedNewsEntity } from "../summarized-news-repository/entities/summarized-news.entity";
import { FindManyOptions } from "typeorm";

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
      rawNews.category = createRawNewsDto.category;

      return repository.save(rawNews);
    } catch (erro) {
      if ((retry ?? 1) < 3)
        return this.create(createRawNewsDto, { retry: retry + 1 });
      console.error("Erro ao escrever no arquivo:", erro);
      return;
    }
  }

  async findNotSummarized(): Promise<any[]> {
    const summarizedNews = await AppDataSource.getRepository(
      SummarizedNewsEntity
    ).find({
      relations: {
        rawNews: true,
      },
      select: {
        rawNews: {
          id: true,
        },
      },
    });

    const ids = summarizedNews.map((item) => item?.rawNews?.id) ?? [];

    const query = repository
      .createQueryBuilder("raw_news");

    if (ids.length) {
      query.where("raw_news.id NOT IN (:...ids)", {
        ids,
      });
    }
    return query.getMany();
  }

  async findRawNewsByTitleAndContent(title: string, content: string): Promise<RawNewsEntity[]> {
    return repository.find({
      where: {
        title,
        content
      }
    });
  }

  findOne(entity: RawNewsEntity) {
    return repository.findOne({
      where: entity
    });
  }
}
