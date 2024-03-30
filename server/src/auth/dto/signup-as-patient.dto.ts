import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserDto } from 'src/realizations/user/dto/create-user.dto';

export class SignupAsPatientDto extends CreateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  address: string;
}
