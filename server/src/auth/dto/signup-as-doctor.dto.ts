import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateScheduleDto } from 'src/realizations/schedule/dto/create-schedule.dto';
import { CreateUserDto } from 'src/realizations/user/dto/create-user.dto';

export class SignupAsDoctorDto extends CreateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  specialty: string;

  @ApiProperty({ type: Date })
  @IsDateString()
  careerStartDate: Date;

  @ApiProperty({ type: () => CreateScheduleDto, isArray: true })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateScheduleDto)
  schedule: CreateScheduleDto[];
}
