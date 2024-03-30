import { ApiProperty } from '@nestjs/swagger';

export class TimeSlot {
  @ApiProperty({ type: Date })
  dateTime: Date;

  @ApiProperty({ type: String, example: '10:00' })
  timeStr: string;
}
