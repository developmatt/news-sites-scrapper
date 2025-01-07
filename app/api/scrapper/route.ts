import { extractNews } from "@/app/use-cases/raw-news/extract-news/extract-news";

export async function GET() {
  console.log("GET request received");
  await extractNews();

  return Response.json({ message: "GET request received" });
}