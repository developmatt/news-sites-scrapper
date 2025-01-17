import "reflect-metadata";
import { AppDataSource } from "./infra/database/data-source";
import { initServer } from "./server";

AppDataSource.initialize()
  .then(async () => {
    initServer();
  })
  .catch((error) => console.log(error));
