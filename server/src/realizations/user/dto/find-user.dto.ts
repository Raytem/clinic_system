import { OmitType, PartialType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class FindUserDto extends OmitType(PartialType(UserEntity), [
  'password',
  'roles',
]) {}
