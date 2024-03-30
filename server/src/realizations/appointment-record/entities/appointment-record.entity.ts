import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { AbstractEntity } from 'src/realizations/abstract.entity';
import { DoctorEntity } from 'src/realizations/doctor/entities/doctor.entity';
import { PatientEntity } from 'src/realizations/patient/entities/patient.entity';
import { UserEntity } from 'src/realizations/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('AppointmentRecord')
export class AppointmentRecordEntity extends AbstractEntity {
  @ApiProperty({ type: Date })
  @IsDateString()
  @Column('timestamp')
  dateTime: Date;

  @ApiProperty({ type: () => PatientEntity })
  @ManyToOne(() => PatientEntity, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  patient: PatientEntity;

  @ApiProperty({ type: () => DoctorEntity })
  @ManyToOne(() => DoctorEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;
}
