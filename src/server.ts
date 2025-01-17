import express from "express";
import { Router, Request, Response } from "express";
import { ScrapperController } from "./controllers/scrapper.controller";
import { SummarizedNewsController } from "./controllers/summarized-news.controller";
import { CONFIG } from "./config/config";

const summarizedNewsController = new SummarizedNewsController();
const scrapperController = new ScrapperController();

export const initServer = () => {
  const app = express();
  const route = Router();
  app.use(express.json());

  route.get("/", (req, res) => {
    summarizedNewsController.getSummarizedNews(req, res);
  })

  // route.post("/scrapper", (req, res) => {
  //   scrapperController.scrapNews(req, res);
  // });

  app.use(route);
  app.listen(CONFIG.port, () => {
    console.log(`server running on port ${CONFIG.port}`)
  });
};
