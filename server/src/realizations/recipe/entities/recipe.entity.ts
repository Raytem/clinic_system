import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AbstractEntity } from 'src/realizations/abstract.entity';
import { DoctorEntity } from 'src/realizations/doctor/entities/doctor.entity';
import { PatientEntity } from 'src/realizations/patient/entities/patient.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('Recipe')
export class RecipeEntity extends AbstractEntity {
  @ApiProperty({ type: String })
  @IsString()
  @Column('varchar')
  drugName: string;

  @ApiProperty({ type: String })
  @IsString()
  @Column('varchar')
  instructionForUsage: string;

  @ApiProperty({ type: () => PatientEntity })
  @ManyToOne(() => PatientEntity, (patient) => patient.recipes, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  patient: PatientEntity;

  @ApiProperty({ type: () => DoctorEntity })
  @ManyToOne(() => DoctorEntity, (doctor) => doctor.recipes, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;
}
