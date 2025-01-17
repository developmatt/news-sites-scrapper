import { runScrapperFlowAction } from "../actions/run-scrapper-flow.action";
import { AppDataSource } from "../infra/database/data-source";

AppDataSource.initialize()
  .then(async () => {
    runScrapperFlowAction()
  })
  .catch((error) => console.log(error));
