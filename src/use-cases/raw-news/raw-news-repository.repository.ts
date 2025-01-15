import { ArrayContains, Not } from "typeorm";
import { AppDataSource } from "../../infra/database/data-source";
import { RawNewsEntity } from "../../repositories/raw-news-repository/entities/raw-news.entity";
import { SummarizedNewsRepository } from "../summarized-news/summarized-news-repository.repository";
import { CreateRawNewsDto } from "./dto/create-raw-news.dto";

type CreateOptions = {
  retry?: number;
};

const repository = AppDataSource.getRepository(RawNewsEntity);

export class RawNewsRepository {
  async create(
    data: CreateRawNewsDto,
    options?: CreateOptions
  ): Promise<RawNewsEntity | undefined> {
    const retry = options?.retry ?? 0;
    try {
      return await repository.save(data);
    } catch (erro) {
      if ((retry ?? 1) < 3)
        return this.create(data, { retry: retry + 1 });
      console.error("Erro ao escrever no arquivo:", erro);
      return;
    }
  }

  async findNotSummarized(): Promise<RawNewsEntity[]> {
    const summarizedNewsRepository = new SummarizedNewsRepository();
    const summarizedNews = await summarizedNewsRepository.findMany({
      select: {
        rawNews: true,
      },
    });

    const ids = summarizedNews.map((item) => item?.rawNews?.id).filter(item => item) ?? [];

    let where;

    if (ids.length) {
      console.log(">>>foi para o length")
      console.log(ids)
      where = {
        id: Not(ArrayContains(ids)),
      }
    }
    return repository.find({ where })
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
