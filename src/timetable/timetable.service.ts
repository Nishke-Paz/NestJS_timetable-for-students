import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { GroupEntity } from './group.entity';
import { TimetableEntity } from './timetable.entity';
import { LessonEntity } from "./lesson.entity";

@Injectable()
export class TimetableService {
  constructor(
    @InjectRepository(GroupEntity)
    private groupRepository: Repository<GroupEntity>,
    @InjectRepository(TimetableEntity)
    private timetableRepository: Repository<TimetableEntity>,
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>,
  ) {}

  async find(): Promise<GroupEntity[]> {
    return await this.groupRepository.find();
  }

  async findAll(): Promise<GroupEntity[]> {
    return await this.groupRepository.find({
      relations: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
    });
  }

  async findById(id: number): Promise<GroupEntity[]> {
    return await this.groupRepository.find({
      where: { id: id },
      relations: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
      ],
    });
  }

  async create(group: GroupEntity): Promise<GroupEntity> {
    return await this.groupRepository.save(group);
  }

  async addTimetable(
    id: number,
    dayOfTheWeek: string,
    lesson: LessonEntity,
  ): Promise<any> {
    await this.lessonRepository.save(lesson);
    const groupById = await this.groupRepository.find({
      where: {
        id: id,
      },
      relations: [dayOfTheWeek],
    });
    groupById[0][dayOfTheWeek] = [...groupById[0][dayOfTheWeek], lesson];
    return this.groupRepository.save(groupById[0]);
    // groupById[0].timetable = [...groupById[0].timetable, timetable];
    // return this.groupRepository.save(groupById[0]);
  }

  async editTimetable(
    id: number,
    timetable: TimetableEntity,
  ): Promise<UpdateResult> {
    return await this.timetableRepository.update(id, timetable);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.groupRepository.delete(id);
  }

  async deleteTimetable(id): Promise<DeleteResult> {
    return await this.timetableRepository.delete(id);
  }
}
