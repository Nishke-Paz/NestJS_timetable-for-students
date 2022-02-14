import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { TimetableEntity } from './timetable.entity';
import { LessonEntity } from "./lesson.entity";

@Entity()
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group: string;

  @ManyToMany((type) => LessonEntity)
  @JoinTable()
  monday: LessonEntity[];

  @ManyToMany((type) => LessonEntity)
  @JoinTable()
  tuesday: LessonEntity[];

  @ManyToMany((type) => LessonEntity)
  @JoinTable()
  wednesday: LessonEntity[];

  @ManyToMany((type) => LessonEntity)
  @JoinTable()
  thursday: LessonEntity[];

  @ManyToMany((type) => LessonEntity)
  @JoinTable()
  friday: LessonEntity[];

  @ManyToMany((type) => LessonEntity)
  @JoinTable()
  saturday: LessonEntity[];

  @ManyToMany((type) => LessonEntity)
  @JoinTable()
  sunday: LessonEntity[];

  // @ManyToMany((type) => TimetableEntity)
  // @JoinTable()
  // timetable: TimetableEntity[];
}
