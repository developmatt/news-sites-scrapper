import { DatabaseInterface } from "../../infra/database/database.interface";
import { CreateRawNewsDto } from "./dto/create-raw-news.dto";

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