import { SummarizedNewsEntity } from "../../repositories/summarized-news-repository/entities/summarized-news.entity";
import { SummarizedNewsRepository } from "./summarized-news-repository.repository";

export class GetHomePageNewsUseCase {
  constructor(private repository: SummarizedNewsRepository) {}

  async execute(): Promise<SummarizedNewsEntity[]> {
    return this.repository.getHomePageNews();
  }
}