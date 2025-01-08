import { getHomePageNewsAction } from "./actions/getHomePageNews";
import { NewsList } from "./components/news-list";
import { CONFIG } from "./config/config";

export default async function Home() {
  const posts = await getHomePageNewsAction()

  console.log(">env", CONFIG.isProd)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <NewsList posts={posts}/>  
      </main>
    </div>
  );
}