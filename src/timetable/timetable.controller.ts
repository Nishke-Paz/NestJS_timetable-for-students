import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GroupEntity } from './group.entity';
import { TimetableService } from './timetable.service';
import { TimetableEntity } from './timetable.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { LessonEntity } from './lesson.entity';

@Controller('timetable')
export class TimetableController {
  constructor(private timetableService: TimetableService) {}

  @Get()
  index(): Promise<GroupEntity[]> {
    return this.timetableService.find();
  }

  @Post('findById')
  async groupById(@Body() idObj: { id: number }): Promise<GroupEntity[]> {
    return this.timetableService.findById(Number(idObj.id));
  }

  @Get('relations')
  getRel(): Promise<GroupEntity[]> {
    return this.timetableService.findAll();
  }

  @Post('createGroup')
  async create(@Body() groupData: GroupEntity): Promise<GroupEntity> {
    return this.timetableService.create(groupData);
  }

  @Put(':id/:dayOfWeek/addTimetable')
  async addTimetable(
    @Param('id') id,
    @Param('dayOfWeek') dayOfWeek,
    @Body() lesson: LessonEntity,
  ): Promise<GroupEntity> {
    return this.timetableService.addTimetable(Number(id), dayOfWeek, lesson);
  }

  @Put(':id/editTimetable')
  async editTimetable(
    @Param('id') id,
    @Body() timetable: TimetableEntity,
  ): Promise<UpdateResult> {
    return this.timetableService.editTimetable(Number(id), timetable);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<DeleteResult> {
    return this.timetableService.delete(id);
  }

  @Delete(':id/deleteTimetable')
  async deleteTimetable(@Param('id') id): Promise<DeleteResult> {
    return this.timetableService.deleteTimetable(id);
  }

  @Delete(':id/deleteLesson')
  async deleteLesson(@Param('id') id): Promise<DeleteResult> {
    return this.timetableService.deleteLesson(id);
  }
}
