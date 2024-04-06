import { OmitType } from '@nestjs/swagger';
import { PatientEntity } from '../entities/patient.entity';

export class CreatePatientDto extends OmitType(PatientEntity, [
  'id',
  'recipes',
]) {}
