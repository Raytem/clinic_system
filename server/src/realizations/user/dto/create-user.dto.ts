import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { IsString, Length } from 'class-validator';

export class CreateUserDto extends OmitType(UserEntity, ['id', 'password']) {
  @ApiProperty({ type: String, minLength: 4, maxLength: 32 })
  @Length(4, 32)
  @IsString()
  password: string;
}
