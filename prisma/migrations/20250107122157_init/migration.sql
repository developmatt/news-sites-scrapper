-- CreateTable
CREATE TABLE "RawNews" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RawNews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SummarizedNews" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT[],
    "categories" TEXT[],
    "mood" TEXT,
    "score" DOUBLE PRECISION,
    "rawNewsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SummarizedNews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SummarizedNews_rawNewsId_key" ON "SummarizedNews"("rawNewsId");

-- AddForeignKey
ALTER TABLE "SummarizedNews" ADD CONSTRAINT "SummarizedNews_rawNewsId_fkey" FOREIGN KEY ("rawNewsId") REFERENCES "RawNews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
