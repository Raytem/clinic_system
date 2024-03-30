import { Module, forwardRef } from '@nestjs/common';
import { AppointmentRecordService } from './appointment-record.service';
import { AppointmentRecordController } from './appointment-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRecordEntity } from './entities/appointment-record.entity';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';
import { ScheduleModule } from '../schedule/schedule.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentRecordEntity]),
    PatientModule,
    forwardRef(() => DoctorModule),
  ],
  controllers: [AppointmentRecordController],
  providers: [AppointmentRecordService],
  exports: [AppointmentRecordService],
})
export class AppointmentRecordModule {}
