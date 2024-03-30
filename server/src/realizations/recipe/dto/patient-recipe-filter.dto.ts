import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsNumberString, IsOptional, Min } from 'class-validator';

export class PatientRecipeFilterDto {
  @ApiProperty({ type: Number, minimum: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  doctorId?: number;
}
