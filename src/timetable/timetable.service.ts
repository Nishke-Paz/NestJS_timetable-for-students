import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createConnection,
  DeleteResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { GroupEntity } from './group.entity';
import { TimetableEntity } from './timetable.entity';
import { LessonEntity } from './lesson.entity';

function sortByTime(a, b) {
  if (a.time > b.time) {
    return 1;
  }
  if (a.time < b.time) {
    return -1;
  }
  return 0;
}

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
    const group = await this.groupRepository.find({
      where: { id: id },
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
    group[0]['monday'].sort(sortByTime);
    group[0]['tuesday'].sort(sortByTime);
    group[0]['wednesday'].sort(sortByTime);
    group[0]['thursday'].sort(sortByTime);
    group[0]['friday'].sort(sortByTime);
    group[0]['saturday'].sort(sortByTime);
    group[0]['sunday'].sort(sortByTime);
    return group;
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

  async deleteLesson(id): Promise<DeleteResult> {
    return await this.lessonRepository.delete(id);
  }
}
