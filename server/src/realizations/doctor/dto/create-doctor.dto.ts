import { OmitType } from '@nestjs/swagger';
import { DoctorEntity } from '../entities/doctor.entity';

export class CreateDoctorDto extends OmitType(DoctorEntity, [
  'id',
  'schedule',
]) {}
