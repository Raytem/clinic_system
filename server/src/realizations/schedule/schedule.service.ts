import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { EntityManager, Repository } from 'typeorm';
import { ScheduleEntity } from './entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private scheduleRepo: Repository<ScheduleEntity>,
  ) {}

  async createMany(
    createScheduleDtos: CreateScheduleDto[],
    transactionalEntityManager?: EntityManager,
  ) {
    const scheduleEntities = this.scheduleRepo.create(createScheduleDtos);

    if (transactionalEntityManager) {
      await transactionalEntityManager.save(scheduleEntities);
    } else {
      await this.scheduleRepo.save(scheduleEntities);
    }

    return scheduleEntities;
  }

  async findByDoctorId(
    doctorId: number,
    weekDay?: number,
  ): Promise<ScheduleEntity[]> {
    const qb = this.scheduleRepo.createQueryBuilder('Schedule');

    qb.leftJoin('Schedule.doctor', 'doctor');
    qb.where('doctor.id = :doctorId', { doctorId });

    if (weekDay !== undefined) {
      qb.andWhere('Schedule.weekDay = :weekDay', { weekDay });
    }

    const schedule = await qb.getMany();

    if (!schedule.length) {
      throw new NotFoundException('No schedule found for this doctor');
    }

    return schedule;
  }

  // async findAll() {
  //   return `This action returns all schedule`;
  // }

  // async findOne(id: number) {
  //   return `This action returns a #${id} schedule`;
  // }

  // async update(id: number, updateScheduleDto: UpdateScheduleDto) {
  //   return `This action updates a #${id} schedule`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} schedule`;
  // }
}
