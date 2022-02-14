import { Module } from '@nestjs/common';
import { TimetableController } from './timetable.controller';
import { TimetableService } from './timetable.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './group.entity';
import { TimetableEntity } from './timetable.entity';
import { LessonEntity } from './lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupEntity, TimetableEntity, LessonEntity]),
  ],
  controllers: [TimetableController],
  providers: [TimetableService],
})
export class TimetableModule {}
