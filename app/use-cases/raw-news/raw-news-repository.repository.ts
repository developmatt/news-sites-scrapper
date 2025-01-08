import { PrismaClient, RawNews } from "@prisma/client";
import { CreateRawNewsDto } from "./dto/create-raw-news.dto";

type CreateOptions = {
  retry?: number;
};

const prisma = new PrismaClient()

export class RawNewsRepository {
  async create(
    data: CreateRawNewsDto,
    options?: CreateOptions
  ): Promise<RawNews | undefined> {
    const retry = options?.retry ?? 0;
    try {
      return prisma.rawNews.create({data});
    } catch (erro) {
      if ((retry ?? 1) < 3)
        return this.create(data, { retry: retry + 1 });
      console.error("Erro ao escrever no arquivo:", erro);
      return;
    }
  }

  async findNotSummarized(): Promise<RawNews[]> {
    const summarizedNews = await prisma.summarizedNews.findMany({
      select: {
        rawNews: true,
      },
    });

    const ids = summarizedNews.map((item) => item?.rawNews?.id) ?? [];

    let where;

    if (ids.length) {
      where = {
        id: {
          notIn: ids,
        },
      }
    }
    return prisma.rawNews.findMany({ where })
  }

  async findRawNewsByTitleAndContent(title: string, content: string): Promise<RawNews[]> {
    return prisma.rawNews.findMany({
      where: {
        title,
        content
      }
    });
  }

  findOne(entity: RawNews) {
    return prisma.rawNews.findFirst({
      where: entity
    });
  }
}
