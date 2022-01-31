import { Module } from '@nestjs/common';
import { TimetableController } from './timetable.controller';
import { TimetableService } from './timetable.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './group.entity';
import { TimetableEntity } from './timetable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, TimetableEntity])],
  controllers: [TimetableController],
  providers: [TimetableService],
})
export class TimetableModule {}
