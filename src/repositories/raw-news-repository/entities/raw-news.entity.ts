import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../../../infra/database/entity/abstract.entity";

@Entity()
export class RawNewsEntity extends AbstractEntity {
  @PrimaryColumn({ type: 'text' })
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  source: string;

  @Column({ type: 'text' })
  category: string;
}