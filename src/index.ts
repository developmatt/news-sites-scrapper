import { G1 } from "./extractors/g1"
import { RawNewsRepository } from "./repositories/raw-news-repository/raw-news-repository.repository"

async function start() {
  //TODO: Go to home page
  //TODO: Read the home page news and store their page links
  //TODO: Go to each page and store the news content
  //TODO: Get the news content and send to the API
    //Remember to ask for tags

  //TODO: Save the response in database
  //TODO: Call the endpoint to update the news


  const rawNewsDatabase = new RawNewsRepository()
  const g1 = new G1(rawNewsDatabase)
  await g1.extract()
}

start()

