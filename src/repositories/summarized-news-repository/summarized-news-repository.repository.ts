import { AppDataSource } from "../../infra/database/data-source";
import { DatabaseInterface } from "../../infra/database/database.interface";
import { CreateSummarizedNewsDto } from "./dto/create-summarized-news.dto";
import { SummarizedNewsEntity } from "./entities/summarized-news.entity";

const repository = AppDataSource.getRepository(SummarizedNewsEntity);

export class SummarizedNewsRepository implements DatabaseInterface {
  async create(createSummarizedNewsDto: CreateSummarizedNewsDto): Promise<SummarizedNewsEntity | undefined> {
    try {
      const summarizedNews = new SummarizedNewsEntity();
      summarizedNews.title = createSummarizedNewsDto.title;
      summarizedNews.content = createSummarizedNewsDto.content;
      summarizedNews.tags = createSummarizedNewsDto.tags;
      summarizedNews.categories = createSummarizedNewsDto.categories;
      summarizedNews.mood = createSummarizedNewsDto.mood;

      return repository.save(summarizedNews);
    } catch (erro) {
      console.error("Erro ao escrever no arquivo:", erro);
      return;
    }
  }
}