import { CnnNews } from "./extractors/cnn-news"
import { G1 } from "./extractors/g1"
import { R7News } from "./extractors/r7-news"
import { RawNewsRepository } from "./repositories/raw-news-repository/raw-news-repository.repository"

async function start() {
  //TODO: Go to home page
  //TODO: Read the home page news and store their page links
  //TODO: Go to each page and store the news content
  //TODO: Get the news content and send to the API
    //Remember to ask for tags

  //TODO: Save the response in database
  //TODO: Call the endpoint to update the news


  const g1RawNewsDatabase = new RawNewsRepository('storage/g1/raw')
  const cnnNewsRawRawNewsDatabase = new RawNewsRepository('storage/cnnnews/raw')
  const r7NewsRawNewsDatabase = new RawNewsRepository('storage/r7/raw')
  const g1 = new G1(g1RawNewsDatabase)
  const cnnNews = new CnnNews(cnnNewsRawRawNewsDatabase)
  const r7News = new R7News(r7NewsRawNewsDatabase)

  await Promise.all([
    g1.extract(),
    cnnNews.extract(),
    r7News.extract()
  ])

}

start()

