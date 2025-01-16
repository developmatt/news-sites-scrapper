import { DataSource } from "typeorm";
import { RawNewsEntity } from "../../repositories/raw-news-repository/entities/raw-news.entity";
import { SummarizedNewsEntity } from "../../repositories/summarized-news-repository/entities/summarized-news.entity";
import { CONFIG } from "../../config/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: CONFIG.dbHost ?? 'localhost',
  port: CONFIG.dbPort ?? 5432,
  username: CONFIG.dbUser ?? 'pg',
  password: CONFIG.dbPassword ?? 'pg',
  database: CONFIG.dbName ?? 'news_scrapper',
  synchronize: false,
  logging: true,
  // extra: {
  //   ssl: "true",
  // },
  entities: [
    RawNewsEntity,
    SummarizedNewsEntity
  ],
  subscribers: [],
  migrations: ['dist/src/infra/database/migrations/*.js'],
})