import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsMobilePhone,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { AbstractEntity } from '../../abstract.entity';
import { Column, Entity, Index } from 'typeorm';
import { Role } from 'src/enums/role.enum';

@Entity('User')
export class UserEntity extends AbstractEntity {
  @ApiProperty({ type: String, example: 'test@yandex.by' })
  @IsEmail()
  @Index('IDX_USER_EMAIL', { unique: true })
  @Column('varchar', { unique: true })
  email: string;

  @Exclude()
  @IsString()
  @Length(4, 32)
  @Column('varchar')
  password: string;

  @ApiProperty({ type: String, minLength: 1, maxLength: 20 })
  @IsString()
  @Length(1, 20)
  @Column('varchar')
  firstName: string;

  @ApiProperty({ type: String, minLength: 1, maxLength: 20 })
  @IsString()
  @Length(1, 20)
  @Column('varchar')
  lastName: string;

  @ApiProperty({ type: String, minLength: 1, maxLength: 20 })
  @IsString()
  @Length(1, 20)
  @Column('varchar')
  patronymic: string;

  @ApiProperty({ type: String, example: '+375448295830' })
  @IsString()
  @Column('varchar')
  phoneNumber: string;

  @ApiProperty({ type: Date })
  @IsDateString()
  @Column('date')
  birthDate: Date;

  @ApiProperty({
    type: Number,
    minimum: 1,
    maximum: 2,
    description: '1 - male, 2- female',
  })
  @IsNumber()
  @Min(1)
  @Max(2)
  @Column('int')
  sex: number;

  @Column('int', { array: true })
  roles: Role[];

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
