import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./lesson.entity";

@Entity()
export class TimetableEntity {
  @PrimaryGeneratedColumn()
  private id: number;

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

  // @Column()
  // dayOfTheWeek: string;
  //
  // @Column()
  // subject: string;
  //
  // @Column()
  // teacher: string;
  //
  // @Column()
  // lectureHall: string;
  //
  // @Column()
  // time: string;
}
