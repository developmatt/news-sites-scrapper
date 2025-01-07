import { getHomePageNewsRepository } from "../repository/raw-news/get-home-news.repository";

export const getHomePageNewsAction = async () => {
  const rawNewsRepository = await getHomePageNewsRepository();
  console.log(">>>rawNewsRepository");
  console.log(rawNewsRepository);
  return rawNewsRepository;
};
