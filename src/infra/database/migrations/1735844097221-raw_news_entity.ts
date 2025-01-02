import { MigrationInterface, QueryRunner } from "typeorm";

export class RawNewsEntity1735844097221 implements MigrationInterface {
    name = 'RawNewsEntity1735844097221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "raw_news_entity" (
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP WITH TIME ZONE,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" text NOT NULL,
                "content" text NOT NULL,
                "source" text NOT NULL,
                "category" text NOT NULL,
                CONSTRAINT "PK_bd12a2f85df8c176ee373bee353" PRIMARY KEY ("id")
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
                "tags" text array,
                "categories" text array,
                "mood" "public"."summarized_news_entity_mood_enum" NOT NULL DEFAULT 'neutral',
                "score" integer NOT NULL DEFAULT '0',
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
            DROP TABLE "raw_news_entity"
        `);
    }

}
