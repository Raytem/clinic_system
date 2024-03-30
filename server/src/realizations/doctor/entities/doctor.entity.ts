import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';
import { AbstractEntity } from 'src/realizations/abstract.entity';
import { ScheduleEntity } from 'src/realizations/schedule/entities/schedule.entity';
import { UserEntity } from 'src/realizations/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('Doctor')
export class DoctorEntity extends AbstractEntity {
  @ApiProperty({ type: String })
  @IsString()
  @Column('varchar')
  specialty: string;

  @ApiProperty({ type: Date })
  @IsDateString()
  @Column('timestamp')
  careerStartDate: Date;

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty({ type: () => ScheduleEntity, isArray: true })
  @OneToMany(() => ScheduleEntity, (schedule) => schedule.doctor, {
    eager: true,
  })
  schedule: ScheduleEntity[];
}
