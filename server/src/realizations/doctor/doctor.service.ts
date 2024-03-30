import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { EntityManager, In, Repository } from 'typeorm';
import { DoctorEntity } from './entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSlotsFilterDto } from './dto/time-slots-filter.dto';
import { ScheduleService } from '../schedule/schedule.service';
import { AppointmentRecordService } from '../appointment-record/appointment-record.service';
import { timeUtil } from 'src/utils/time.util';
import { AppointmentRecordEntity } from '../appointment-record/entities/appointment-record.entity';
import { TimeSlot } from './types/time-slot';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>,

    @InjectRepository(AppointmentRecordEntity)
    private appointmentRepo: Repository<AppointmentRecordEntity>,

    private scheduleService: ScheduleService,

    private appointmentService: AppointmentRecordService,
  ) {}

  async create(
    createDoctorDto: CreateDoctorDto,
    transactionalEntityManager: EntityManager,
  ): Promise<DoctorEntity> {
    const docEntity = await this.doctorRepo.create(createDoctorDto);

    if (transactionalEntityManager) {
      await transactionalEntityManager.save(docEntity);
    } else {
      await this.doctorRepo.save(docEntity);
    }

    return docEntity;
  }

  async findByUserId(userId: number): Promise<DoctorEntity> {
    const doctor = await this.doctorRepo.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
    });

    if (!doctor) {
      throw new NotFoundException('No such doctor');
    }

    return doctor;
  }

  async findAll() {
    const docs = await this.doctorRepo.find();

    return docs;
  }

  async findOne(id: number) {
    const doc = await this.doctorRepo.findOneBy({ id });

    if (!doc) {
      throw new NotFoundException('No such doctor');
    }

    return doc;
  }

  async getTimeSlots(
    id: number,
    timeSlotsFilterDto: TimeSlotsFilterDto,
  ): Promise<TimeSlot[]> {
    const doctor = await this.findOne(id);
    const queryDate = new Date(timeSlotsFilterDto.date);

    const schedule = (
      await this.scheduleService.findByDoctorId(doctor.id, queryDate.getDay())
    )[0];

    const startTime = timeUtil.getTime(schedule.startTime);
    const endTime = timeUtil.getTime(schedule.endTime);

    const startDateTime = new Date(queryDate);
    startDateTime.setHours(
      startTime.hours,
      startTime.minutes,
      startTime.seconds,
    );

    const avgAppointmentTime = timeUtil.getTime(schedule.avgAppointmentTime);
    const endDateTime = new Date(queryDate);
    endDateTime.setHours(
      endTime.hours - avgAppointmentTime.hours,
      endTime.minutes - avgAppointmentTime.minutes,
      endTime.seconds - avgAppointmentTime.seconds,
    );

    const avgAppointmentDateTime = new Date(startDateTime);
    let appointmentDateTimes: Date[] = [];
    while (endDateTime > avgAppointmentDateTime) {
      avgAppointmentDateTime.setHours(
        avgAppointmentDateTime.getHours() + avgAppointmentTime.hours,
        avgAppointmentDateTime.getMinutes() + avgAppointmentTime.minutes,
        avgAppointmentDateTime.getSeconds() + avgAppointmentTime.seconds,
      );
      appointmentDateTimes.push(new Date(avgAppointmentDateTime));
    }

    const existingAppointments = await this.appointmentRepo.find({
      where: {
        doctor: { id },
        dateTime: In(appointmentDateTimes),
      },
      relations: { patient: false, doctor: true },
    });

    appointmentDateTimes = appointmentDateTimes.filter((ap) => {
      const isExists = existingAppointments.some(
        (exAp) => exAp.dateTime.getTime() === ap.getTime(),
      );

      return !isExists;
    });

    return appointmentDateTimes.map((ap) => ({
      dateTime: ap,
      timeStr: timeUtil.toTimeStr(ap),
    }));
  }

  // async update(id: number, updateDoctorDto: UpdateDoctorDto) {
  //   return `This action updates a #${id} doctor`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} doctor`;
  // }
}
