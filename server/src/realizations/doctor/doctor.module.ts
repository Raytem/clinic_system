import { Module, forwardRef } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './entities/doctor.entity';
import { ScheduleModule } from '../schedule/schedule.module';
import { AppointmentRecordModule } from '../appointment-record/appointment-record.module';
import { ScheduleService } from '../schedule/schedule.service';
import { AppointmentRecordService } from '../appointment-record/appointment-record.service';
import { AppointmentRecordEntity } from '../appointment-record/entities/appointment-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorEntity, AppointmentRecordEntity]),
    ScheduleModule,
    AppointmentRecordModule,
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}
