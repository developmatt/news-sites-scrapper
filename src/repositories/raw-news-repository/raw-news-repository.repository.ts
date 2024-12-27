import { CreateRawNewsDto } from "./dto/create-raw-news.dto";

export class RawNewsRepository {
  constructor(
    private readonly database: any
  ) {}

  async create(rawNews: CreateRawNewsDto) {
    this.database.create(rawNews);
  }
}