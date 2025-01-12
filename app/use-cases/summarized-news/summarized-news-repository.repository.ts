import { Prisma, PrismaClient, SummarizedNews } from "@prisma/client";
import { CreateSummarizedNewsDto } from "./dto/create-summarized-news.dto";
import { RawNewsCategoryEnum } from "@/app/enums/raw-news-category.enum";

const prisma = new PrismaClient();
const repository = prisma.summarizedNews;

export class SummarizedNewsRepository {
  async create(
    data: CreateSummarizedNewsDto
  ): Promise<SummarizedNews | undefined> {
    try {
      return repository.create({ data });
    } catch (erro) {
      console.error("Erro ao escrever no arquivo:", erro);
      return;
    }
  }

  async findBy(
    options: Prisma.SummarizedNewsFindManyArgs
  ): Promise<SummarizedNews[]> {
    return repository.findMany(options);
  }

  async findOne(
    options: Prisma.SummarizedNewsFindUniqueArgs
  ): Promise<SummarizedNews | null> {
    return repository.findFirst(options);
  }

  async getHomePageNews(): Promise<SummarizedNews[]> {
    try {
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

      const q: SummarizedNews[] = await prisma.$queryRaw`
        SELECT * FROM "SummarizedNews"
        WHERE "createdAt" >= ${date}
        ORDER BY
        ${order
          .map((category) => `array_position(categories, ${category}) ASC,`)
          .join("\n")}
      `;

      return q;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
