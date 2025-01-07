import { getDataSource } from "@/app/config/data-source";
import { RawNewsCategoryEnum } from "@/app/enums/raw-news-category.enum";
import { SummarizedNewsEntity } from "@/src/repositories/summarized-news-repository/entities/summarized-news.entity";

export const getHomePageNewsRepository = async (): Promise<SummarizedNewsEntity[]> => {
  const dataSource = await getDataSource();
  const repository = dataSource.getRepository(SummarizedNewsEntity);

  const date = new Date(new Date().setHours(0, 0, 0, 0));

  const order: RawNewsCategoryEnum[] = [
    RawNewsCategoryEnum.WORLD,
    RawNewsCategoryEnum.LIFESTYLE,
    RawNewsCategoryEnum.ECONOMY,
    RawNewsCategoryEnum.HEALTH,
    RawNewsCategoryEnum.ENTERTAINMENT,
    RawNewsCategoryEnum.INTERNATIONAL_POLITICS,
    RawNewsCategoryEnum.TECHNOLOGY,
    RawNewsCategoryEnum.POLITICS,
    RawNewsCategoryEnum.CELEBRITIES,
    RawNewsCategoryEnum.SPORTS,
  ];

  const query = repository.createQueryBuilder("summary");

  query.where("summary.createdAt >= :date", { date });

  for (let i = 0; i < order.length; i++) {
    query.addSelect(
      `array_position(summary.categories, :cat${i + 1})`,
      `cat${i + 1}Position`
    );
    query[i === 0 ? "orderBy" : "addOrderBy"](
      `array_position(summary.categories, :cat${i + 1})`,
      "ASC"
    );
  }

  query.setParameters(
    order.reduce(
      (acc: { [key: string]: RawNewsCategoryEnum }, category, index) => {
        acc[`cat${index + 1}`] = category;
        return acc;
      },
      {}
    )
  );

  return query.getMany();
};
