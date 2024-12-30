import { RawNewsRepository } from "../repositories/raw-news-repository/raw-news-repository.repository"

export const selectRawNewsToSummarize = async () => {
  const rawNewsRepository = new RawNewsRepository();
  return rawNewsRepository.findNotSummarized();
}