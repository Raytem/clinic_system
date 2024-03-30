import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { EntityManager, Repository } from 'typeorm';
import { PatientEntity } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientFindOptions } from './types/patient-find-options.type';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientRepo: Repository<PatientEntity>,
  ) {}

  async create(
    createPatientDto: CreatePatientDto,
    transactionalEntityManager?: EntityManager,
  ): Promise<PatientEntity> {
    const patientEntity = this.patientRepo.create(createPatientDto);

    if (transactionalEntityManager) {
      await transactionalEntityManager.save(patientEntity);
    } else {
      await this.patientRepo.save(patientEntity);
    }

    return patientEntity;
  }

  async findByUserId(userId: number): Promise<PatientEntity> {
    const patient = await this.patientRepo.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
    });

    if (!patient) {
      throw new NotFoundException('No such patient');
    }

    return patient;
  }

  async findAll(): Promise<PatientEntity[]> {
    const patients = await this.patientRepo.find();
    return patients;
  }

  async findOne(id: number): Promise<PatientEntity> {
    const patient = await this.patientRepo.findOneBy({ id });

    if (!patient) {
      throw new NotFoundException('No such patient');
    }

    return patient;
  }

  // update(id: number, updatePatientDto: UpdatePatientDto) {
  //   return `This action updates a #${id} patient`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} patient`;
  // }
}
