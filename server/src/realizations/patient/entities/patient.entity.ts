import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AbstractEntity } from 'src/realizations/abstract.entity';
import { UserEntity } from 'src/realizations/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('Patient')
export class PatientEntity extends AbstractEntity {
  @ApiProperty({ type: String })
  @IsString()
  @Column('varchar')
  address: string;

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
