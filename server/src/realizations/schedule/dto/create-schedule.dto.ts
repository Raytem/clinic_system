import { OmitType } from '@nestjs/swagger';
import { ScheduleEntity } from '../entities/schedule.entity';

export class CreateScheduleDto extends OmitType(ScheduleEntity, ['id']) {}
