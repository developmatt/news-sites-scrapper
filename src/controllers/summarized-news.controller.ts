import { Request, Response } from "express";
import { SummarizedNewsRepository } from "../use-cases/summarized-news/summarized-news-repository.repository";
import { GetHomePageNewsUseCase } from "../use-cases/summarized-news/get-home-page-news.use-case";

export class SummarizedNewsController {
  async getSummarizedNews(req: Request, res: Response) {
    const summarizedRepository = new SummarizedNewsRepository();
    const getHomePageNewsUseCase = new GetHomePageNewsUseCase(
      summarizedRepository
    );
    const content = await getHomePageNewsUseCase.execute();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(content || {}));
    return res.end();
  }
}