import { MigrationInterface, QueryRunner } from "typeorm";

export class RawNewsAndSummarizedNews1735520143249 implements MigrationInterface {
    name = 'RawNewsAndSummarizedNews1735520143249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."raw_news_entity_source_enum" AS ENUM('g1', 'cnn_news', 'r7_news')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."raw_news_entity_rawcategory_enum" AS ENUM(
                'politics',
                'world',
                'sports',
                'technology',
                'economy',
                'entertainment',
                'celebrities',
                'health',
                'education',
                'culture',
                'environment',
                'science',
                'security',
                'justice_and_law',
                'transport',
                'lifestyle',
                'religion',
                'international_politics'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "raw_news_entity" (
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP WITH TIME ZONE,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" text NOT NULL,
                "content" text NOT NULL,
                "source" "public"."raw_news_entity_source_enum" NOT NULL,
                "rawCategory" "public"."raw_news_entity_rawcategory_enum" NOT NULL,
                CONSTRAINT "PK_bd12a2f85df8c176ee373bee353" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."summarized_news_entity_categories_enum" AS ENUM(
                'politics',
                'world',
                'sports',
                'technology',
                'economy',
                'entertainment',
                'celebrities',
                'health',
                'education',
                'culture',
                'environment',
                'science',
                'security',
                'justice_and_law',
                'transport',
                'lifestyle',
                'religion',
                'international_politics'
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."summarized_news_entity_mood_enum" AS ENUM('positive', 'negative', 'neutral')
        `);
        await queryRunner.query(`
            CREATE TABLE "summarized_news_entity" (
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP WITH TIME ZONE,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" text NOT NULL,
                "content" text NOT NULL,
                "tags" text array NOT NULL,
                "categories" "public"."summarized_news_entity_categories_enum" array NOT NULL,
                "mood" "public"."summarized_news_entity_mood_enum" NOT NULL,
                "rawNewsId" uuid,
                CONSTRAINT "REL_c36fbf62d4464295923694b6b4" UNIQUE ("rawNewsId"),
                CONSTRAINT "PK_f9ed2dd4565625f953e462201c8" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "summarized_news_entity"
            ADD CONSTRAINT "FK_c36fbf62d4464295923694b6b4c" FOREIGN KEY ("rawNewsId") REFERENCES "raw_news_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "summarized_news_entity" DROP CONSTRAINT "FK_c36fbf62d4464295923694b6b4c"
        `);
        await queryRunner.query(`
            DROP TABLE "summarized_news_entity"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."summarized_news_entity_mood_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."summarized_news_entity_categories_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "raw_news_entity"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."raw_news_entity_rawcategory_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."raw_news_entity_source_enum"
        `);
    }

}
