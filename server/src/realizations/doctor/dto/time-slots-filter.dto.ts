import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsDateString } from 'class-validator';

export class TimeSlotsFilterDto {
  @ApiProperty({ type: Date })
  @Type(() => Date)
  @IsDate()
  date: string;
}
