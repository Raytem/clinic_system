import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateAppointmentRecordDto } from './dto/create-appointment-record.dto';
import { UpdateAppointmentRecordDto } from './dto/update-appointment-record.dto';
import { UserEntity } from '../user/entities/user.entity';
import { PatientService } from '../patient/patient.service';
import { DoctorService } from '../doctor/doctor.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentRecordEntity } from './entities/appointment-record.entity';
import { Repository } from 'typeorm';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable()
export class AppointmentRecordService {
  constructor(
    @InjectRepository(AppointmentRecordEntity)
    private recordRepo: Repository<AppointmentRecordEntity>,

    private patientService: PatientService,

    @Inject(forwardRef(() => DoctorService))
    private doctorService: DoctorService,
  ) {}

  async create(
    createAppointmentRecordDto: CreateAppointmentRecordDto,
    user: UserEntity,
  ): Promise<AppointmentRecordEntity> {
    const curPatient = await this.patientService.findByUserId(user.id);

    const doctor = await this.doctorService.findOne(
      createAppointmentRecordDto.doctorId,
    );

    const slots = await this.doctorService.getTimeSlots(doctor.id, {
      date: createAppointmentRecordDto.dateTime.toString(),
    });

    const appointmentDate = new Date(createAppointmentRecordDto.dateTime);
    const slotExists = slots.some(
      (slot) => slot.dateTime.getTime() === appointmentDate.getTime(),
    );

    if (!slots.length) {
      throw new NotFoundException('There is no free slots');
    }

    if (!slotExists) {
      throw new BadRequestException('No slots found on this date or time');
    }

    const appointmentEntity = this.recordRepo.create({
      dateTime: appointmentDate,
      patient: curPatient,
      doctor,
    });

    await this.recordRepo.save(appointmentEntity);

    return appointmentEntity;
  }

  async findByDoctor(user: UserEntity): Promise<AppointmentRecordEntity[]> {
    const curDoctor = await this.doctorService.findByUserId(user.id);

    const records = await this.recordRepo.find({
      where: {
        doctor: {
          id: curDoctor.id,
        },
      },
      relations: {
        doctor: true,
      },
    });

    return records;
  }

  async findByPatient(user: UserEntity): Promise<AppointmentRecordEntity[]> {
    const curPatient = await this.patientService.findByUserId(user.id);

    const records = await this.recordRepo.find({
      where: {
        patient: {
          id: curPatient.id,
        },
      },
      relations: {
        patient: true,
      },
    });

    return records;
  }

  async findOne(id: number) {
    const record = await this.recordRepo.findOneBy({ id });

    if (!record) {
      throw new NotFoundException('No such appointment record');
    }

    return record;
  }

  // async update(
  //   id: number,
  //   updateAppointmentRecordDto: UpdateAppointmentRecordDto,
  // ) {
  //   return `This action updates a #${id} appointmentRecord`;
  // }

  async remove(id: number, user: UserEntity) {
    const record = await this.findOne(id);
    const curPatient = await this.patientService.findByUserId(user.id);

    if (record.patient.id !== curPatient.id) {
      throw new ForbiddenException('You can cancel only your records');
    }

    await this.recordRepo.delete({ id });

    return record;
  }
}
