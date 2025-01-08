import { SummarizedNewsEntity } from "@/src/repositories/summarized-news-repository/entities/summarized-news.entity"
import ReactMarkdown from 'react-markdown'

type NewsBlockProps = {
  news: SummarizedNewsEntity
}

export const NewsBlock = async ({ news }: NewsBlockProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{news.title}</h2>
      <ReactMarkdown>{news.content}</ReactMarkdown>
    </div>
  )
}