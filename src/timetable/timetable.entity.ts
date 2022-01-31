import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TimetableEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  dayOfTheWeek: string;

  @Column()
  subject: string;

  @Column()
  teacher: string;

  @Column()
  lectureHall: string;

  @Column()
  time: string;
}
