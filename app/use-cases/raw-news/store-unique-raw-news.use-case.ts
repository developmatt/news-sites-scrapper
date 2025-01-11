
import { DatabaseInterface } from "@/app/infra/database/database.interface";
import { CreateRawNewsDto } from "../../../app/use-cases/raw-news/dto/create-raw-news.dto";

export class StoreUniqueRawNewsUseCase {
  constructor(private readonly repository: DatabaseInterface) {}
  
  async execute(rawNews: CreateRawNewsDto) {
    const newsToFind = {
      title: rawNews.title,
      content: rawNews.content
    }
    const existingNews = await this.repository.findOne(newsToFind)
    if(existingNews) throw new Error('News already exists')
    await this.repository.create(rawNews);
  }
}