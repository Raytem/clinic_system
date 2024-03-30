import { ApiProperty, OmitType } from '@nestjs/swagger';
import { AppointmentRecordEntity } from '../entities/appointment-record.entity';
import { IsInt, Min } from 'class-validator';

export class CreateAppointmentRecordDto extends OmitType(
  AppointmentRecordEntity,
  ['id', 'doctor', 'patient'],
) {
  @ApiProperty({ type: Number, minimum: 1 })
  @IsInt()
  @Min(1)
  doctorId: number;
}
