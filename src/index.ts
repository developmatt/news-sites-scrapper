import { AppDataSource } from "./infra/database/data-source";
import "reflect-metadata";
import http from "http";
import url from "url";
import { CONFIG } from "./config/config";
import { GetHomePageNewsUseCase } from "./use-cases/summarized-news/get-home-page-news.use-case";
import { SummarizedNewsRepository } from "./use-cases/summarized-news/summarized-news-repository.repository";
import { Deepseek } from "./lib/deepseek/deepseek.class";
import { DeepseekMock } from "./lib/deepseek/deepseek-mock.class";
import { extractNews } from "./use-cases/raw-news/extract-news/extract-news";
import { selectRawNewsToSummarize } from "./use-cases/raw-news/select-raw-news-to-summarize.use-case";
import { Ai } from "./lib/ai/ai.class";
import { MapSummarizedNewsToStoreUsecase } from "./use-cases/summarized-news/map-summarized-news-to-store.use-case";

AppDataSource.initialize()
  .then(async () => {
    const hostname = CONFIG.host;
    const port = CONFIG.port;
    const server = http.createServer(async (req, res) => {
      const reqUrl = url.parse(req.url ?? "").pathname;

      if (reqUrl == "/") {
        const summarizedRepository = new SummarizedNewsRepository();
        const getHomePageNewsUseCase = new GetHomePageNewsUseCase(
          summarizedRepository
        );
        const content = await getHomePageNewsUseCase.execute();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(content));
        return res.end();
      }

      if (reqUrl == "/scrapper") {
        
        try {
          res.write(JSON.stringify({ success: true }));
          res.end();
          
          await extractNews();
          const news = await selectRawNewsToSummarize();
          const contentsArray = news?.map((item) => {
            return JSON.stringify({
              id: item.id,
              content: item.content,
            });
          });

          const openAIDep = CONFIG.isProd ? new Deepseek() : new DeepseekMock();

          const ai = new Ai(openAIDep);
          const summarized = await ai.summarizeTexts(contentsArray);
          const summarizedRepository = new SummarizedNewsRepository();
          const mapSummarizedNewsToStoreUsecase =
            new MapSummarizedNewsToStoreUsecase();
          await Promise.all(
            summarized.map(async (item, index) => {
              const mapped = mapSummarizedNewsToStoreUsecase.execute(
                item,
                news[index]
              );
              await summarizedRepository.create(mapped);
            })
          );
          
          return 
        } catch (error) {
          console.log(error);
          res.write(JSON.stringify({ success: false, error: error }));
          return res.end();
        }
      }
    });

    server.listen(port, hostname, () => {
      console.log(`Server running at port ${port}`);
    });
  })
  .catch((error) => console.log(error));
