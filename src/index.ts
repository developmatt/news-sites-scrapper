import { AppDataSource } from "./infra/database/data-source";
import "reflect-metadata";
import { runScrapper } from "./core/run-scrapper/run-scrapper";
import http from "http";
import url from "url";
import { CONFIG } from "./config/config";
import { getHomePageNews } from "./core/raw-news/home-page-news/get-home-page-news";

AppDataSource.initialize()
  .then(async () => {
    const hostname = CONFIG.host;
    const port = CONFIG.port
    const server = http.createServer(async (req, res) => {
      const reqUrl = url.parse(req.url ?? "").pathname;

      if (reqUrl == "/") {
        const content = await getHomePageNews();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(content));
        return res.end();
      }
      
      if (reqUrl == "/scrapper") {
        await runScrapper();
        return res.end();
      }
    });

    server.listen(port, hostname, () => {
      console.log(`Server running at port ${port}`);
    });
  })
  .catch((error) => console.log(error));
