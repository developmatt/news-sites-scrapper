import { DataSource } from "typeorm";
import { RawNewsEntity } from "../../repositories/raw-news-repository/entities/raw-news.entity";
import { SummarizedNewsEntity } from "../../repositories/summarized-news-repository/entities/summarized-news.entity";
import { CONFIG } from "../../config/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: CONFIG.dbHost,
  port: CONFIG.dbPort,
  username: CONFIG.dbUser,
  password: CONFIG.dbPassword,
  database: CONFIG.dbName,
  synchronize: false,
  logging: !CONFIG.isProd,
  entities: [
    RawNewsEntity,
    SummarizedNewsEntity
  ],
  subscribers: [],
  migrations: ['dist/src/infra/database/migrations/*.js'],
})