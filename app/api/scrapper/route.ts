import { CONFIG } from "@/app/config/config";
import { Ai } from "@/app/lib/ai/ai.class";
import { DeepseekMock } from "@/app/lib/deepseek/deepseek-mock.class";
import { Deepseek } from "@/app/lib/deepseek/deepseek.class";
import { extractNews } from "@/app/use-cases/raw-news/extract-news/extract-news";
import { selectRawNewsToSummarize } from "@/app/use-cases/raw-news/select-raw-news-to-summarize.use-case";
import { MapSummarizedNewsToStoreUsecase } from "@/app/use-cases/summarized-news/map-summarized-news-to-store.use-case";
import { SummarizedNewsRepository } from "@/app/use-cases/summarized-news/summarized-news-repository.repository";

export const maxDuration = 60;
export async function GET() {
  await extractNews();
  const news = await selectRawNewsToSummarize();
  const contentsArray = news?.map((item) => {
    return JSON.stringify({
      id: item.id,
      content: item.content,
    });
  });

  const openAIDep = CONFIG.isProd ? new Deepseek() : new DeepseekMock();
  
  const ai = new Ai(openAIDep);
  const summarized = await ai.summarizeTexts(contentsArray);

  const summarizedRepository = new SummarizedNewsRepository();
  const mapSummarizedNewsToStoreUsecase = new MapSummarizedNewsToStoreUsecase();
  await Promise.all(
    summarized.map(async (item, index) => {
      try {
        await summarizedRepository.create(
          mapSummarizedNewsToStoreUsecase.execute(item, news[index])
        );
      } catch (e) {
        console.log(e);
      }
    })
  );

  return Response.json({ success: true });
}
