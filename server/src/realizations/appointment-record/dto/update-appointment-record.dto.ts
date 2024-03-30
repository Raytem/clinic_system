import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentRecordDto } from './create-appointment-record.dto';

export class UpdateAppointmentRecordDto extends PartialType(CreateAppointmentRecordDto) {}
