import { Request, Response } from "express";
import { runScrapperFlowAction } from "../actions/run-scrapper-flow.action";

export class ScrapperController {
  async scrapNews(req: Request, res: Response) {
    try {
      res.write(JSON.stringify({ success: true }));
      res.end();

      runScrapperFlowAction();

      return;
    } catch (error) {
      console.log(error);
      res.write(JSON.stringify({ success: false, error: error }));
      return res.end();
    }
  }
}
