import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { RawNewsCategoryEnum } from "../../../enums/raw-news-category.enum";
import { SourcesEnum } from "../../../enums/sources.enum";

@Entity()
export class RawNewsEntity {
  @PrimaryColumn({ type: 'text' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: SourcesEnum })
  source: SourcesEnum;

  @Column({ type: 'enum', enum: RawNewsCategoryEnum })
  rawCategory: RawNewsCategoryEnum;
}