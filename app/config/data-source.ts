import { DataSource } from "typeorm";
import { CONFIG } from "./config";
import "reflect-metadata"
import { SummarizedNewsEntity } from "@/src/repositories/summarized-news-repository/entities/summarized-news.entity";
import { RawNewsEntity } from "@/app/use-cases/raw-news/entities/raw-news.entity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: CONFIG.dbHost ?? 'localhost',
  port: CONFIG.dbPort ?? 5432,
  username: CONFIG.dbUser ?? 'pg',
  password: CONFIG.dbPassword ?? 'pg',
  database: CONFIG.dbName ?? 'news_scrapper',
  synchronize: false,
  logging: !CONFIG.isProd,
  entities: [
    RawNewsEntity,
    SummarizedNewsEntity
  ],
  subscribers: [],
})

export const getDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};