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

@Controller('timetable')
export class TimetableController {
  constructor(private timetableService: TimetableService) {}

  @Get()
  index(): Promise<GroupEntity[]> {
    return this.timetableService.find();
  }

  @Get('relations')
  getRel(): Promise<GroupEntity[]> {
    return this.timetableService.findAll();
  }

  @Post('createGroup')
  async create(@Body() groupData: GroupEntity): Promise<GroupEntity> {
    return this.timetableService.create(groupData);
  }

  @Put(':id/addTimetable')
  async addTimetable(
    @Param('id') id,
    @Body() timetableData: TimetableEntity,
  ): Promise<GroupEntity> {
    return this.timetableService.addTimetable(Number(id), timetableData);
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
}
