import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMilitaryTime, Max, Min } from 'class-validator';
import { AbstractEntity } from 'src/realizations/abstract.entity';
import { DoctorEntity } from 'src/realizations/doctor/entities/doctor.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Schedule')
export class ScheduleEntity extends AbstractEntity {
  @ApiProperty({
    type: Number,
    minimum: 1,
    maximum: 7,
    description: 'weakDays 0-6 (sunday-saturday)',
  })
  @IsInt()
  @Min(0)
  @Max(6)
  @Column('int')
  weekDay: number;

  @ApiProperty({ type: Date, example: '08:00' })
  @IsMilitaryTime()
  @Column('time')
  startTime: string;

  @ApiProperty({ type: Date, example: '17:00' })
  @IsMilitaryTime()
  @Column('time')
  endTime: string;

  @ApiProperty({ type: Date, example: '00:20' })
  @IsMilitaryTime()
  @Column('time')
  avgAppointmentTime: string;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.schedule, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;
}
