import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LessonEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  subject: string;

  @Column()
  typeLesson: string;

  @Column()
  teacher: string;

  @Column()
  lectureHall: string;

  @Column()
  time: string;
}
