import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { RawNewsCategoryEnum } from "../../../enums/raw-news-category.enum";
import { RawNewsEntity } from "../../raw-news-repository/entities/raw-news.entity";
import { AbstractEntity } from "../../../infra/database/entity/abstract.entity";
import { SummarizedNewMoodsEnum } from "../../../enums/summarized-new-moods.enum";

@Entity()
export class SummarizedNewsEntity extends AbstractEntity {
    @PrimaryColumn({ type: 'text' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'text', array: true })
    tags: string[]

    @Column({ type: 'enum', enum: RawNewsCategoryEnum, array: true })
    categories: RawNewsCategoryEnum[]

    @Column({ type: 'enum', enum: SummarizedNewMoodsEnum })
    mood: SummarizedNewMoodsEnum

    @OneToOne(() => RawNewsEntity)
    @JoinColumn()
    rawNews: RawNewsEntity
}