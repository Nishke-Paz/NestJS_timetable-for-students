import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { TimetableEntity } from './timetable.entity';

@Entity()
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group: string;

  @ManyToMany((type) => TimetableEntity)
  @JoinTable()
  timetable: TimetableEntity[];
}
