import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { GroupEntity } from './group.entity';
import { TimetableEntity } from './timetable.entity';

@Injectable()
export class TimetableService {
  constructor(
    @InjectRepository(GroupEntity)
    private groupRepository: Repository<GroupEntity>,
    @InjectRepository(TimetableEntity)
    private timetableRepository: Repository<TimetableEntity>,
  ) {}

  async find(): Promise<GroupEntity[]> {
    return await this.groupRepository.find();
  }

  async findAll(): Promise<GroupEntity[]> {
    return await this.groupRepository.find({ relations: ['timetable'] });
  }

  async create(group: GroupEntity): Promise<GroupEntity> {
    return await this.groupRepository.save(group);
  }

  async addTimetable(
    id: number,
    timetable: TimetableEntity,
  ): Promise<GroupEntity> {
    await this.timetableRepository.save(timetable);
    const groupById = await this.groupRepository.find({
      where: {
        id: id,
      },
      relations: ['timetable'],
    });
    groupById[0].timetable = [...groupById[0].timetable, timetable];
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
}
