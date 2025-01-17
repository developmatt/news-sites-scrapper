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

    @Column({ type: 'text', array: true, nullable: true })
    tags?: string[]

    @Column({ type: 'text', array: true, nullable: true })
    categories?: string[]

    @Column({ type: 'enum', enum: SummarizedNewMoodsEnum , default: SummarizedNewMoodsEnum.NEUTRAL })
    mood?: SummarizedNewMoodsEnum

    @Column({ type: 'int', default: 0 })
    score?: number

    @OneToOne(() => RawNewsEntity)
    @JoinColumn()
    rawNews: RawNewsEntity
}