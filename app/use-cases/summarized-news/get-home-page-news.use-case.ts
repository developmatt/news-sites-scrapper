import { SummarizedNews } from "@prisma/client";
import { SummarizedNewsRepository } from "./summarized-news-repository.repository";

export class GetHomePageNewsUseCase {
  constructor(private repository: SummarizedNewsRepository) {}

  async execute(): Promise<SummarizedNews[]> {
    return this.repository.getHomePageNews();
  }
}