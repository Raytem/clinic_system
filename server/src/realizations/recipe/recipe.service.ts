import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeEntity } from './entities/recipe.entity';
import { PatientService } from '../patient/patient.service';
import { DoctorService } from '../doctor/doctor.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { PatientRecipeFilterDto } from './dto/patient-recipe-filter.dto';
import { DoctorRecipeFilterDto } from './dto/doctor-recipe-filter.dto copy';

@Injectable()
export class RecipeService {
  constructor(
    private patientService: PatientService,

    private doctorService: DoctorService,

    @InjectRepository(RecipeEntity)
    private recipeRepo: Repository<RecipeEntity>,
  ) {}

  async create(
    createRecipeDto: CreateRecipeDto,
    user: UserEntity,
  ): Promise<RecipeEntity> {
    const curDoctor = await this.doctorService.findByUserId(user.id);

    const patient = await this.patientService.findOne(
      createRecipeDto.patientId,
    );

    const recipeEntity = this.recipeRepo.create({
      ...createRecipeDto,
      doctor: curDoctor,
      patient,
    });

    await this.recipeRepo.save(recipeEntity);

    return recipeEntity;
  }

  async findByDoctor(
    user: UserEntity,
    doctorFilter: DoctorRecipeFilterDto,
  ): Promise<RecipeEntity[]> {
    const curDoctor = await this.doctorService.findByUserId(user.id);

    const qb = this.recipeRepo.createQueryBuilder('Recipe');

    qb.leftJoinAndSelect('Recipe.patient', 'patient');
    qb.leftJoinAndSelect('Recipe.doctor', 'doctor');
    qb.leftJoinAndSelect('patient.user', 'docUser');
    qb.leftJoinAndSelect('doctor.user', 'patUser');
    qb.leftJoinAndSelect('doctor.schedule', 'schedule');

    qb.andWhere('doctor.id = :curDocId', { curDocId: curDoctor.id });

    if (doctorFilter.patientId) {
      qb.andWhere('Recipe.patient_id = :patientId', {
        patientId: doctorFilter.patientId,
      });
    }

    const recipes = await qb.getMany();

    return recipes;
  }

  async findByPatient(
    user: UserEntity,
    patientFilter: PatientRecipeFilterDto,
  ): Promise<RecipeEntity[]> {
    const curPatient = await this.patientService.findByUserId(user.id);

    const qb = this.recipeRepo.createQueryBuilder('Recipe');

    qb.leftJoinAndSelect('Recipe.patient', 'patient');
    qb.leftJoinAndSelect('Recipe.doctor', 'doctor');
    qb.leftJoinAndSelect('patient.user', 'docUser');
    qb.leftJoinAndSelect('doctor.user', 'patUser');
    qb.leftJoinAndSelect('doctor.schedule', 'schedule');

    qb.andWhere('patient.id = :curPatientId', { curPatientId: curPatient.id });

    if (patientFilter.doctorId) {
      qb.andWhere('Recipe.doctor_id = :doctorId', {
        doctorId: patientFilter.doctorId,
      });
    }

    const recipes = await qb.getMany();

    return recipes;
  }

  async findOne(id: number): Promise<RecipeEntity> {
    const recipe = await this.recipeRepo.findOneBy({ id });

    if (!recipe) {
      throw new NotFoundException('No such recipe');
    }

    return recipe;
  }

  async update(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
    user: UserEntity,
  ): Promise<RecipeEntity> {
    const curDoctor = await this.doctorService.findByUserId(user.id);
    const recipe = await this.recipeRepo.findOne({
      where: { id },
      relations: { doctor: true },
    });

    if (recipe.doctor.id !== curDoctor.id) {
      throw new ForbiddenException(
        'You can change only recipes created by yourself',
      );
    }

    await this.recipeRepo.update({ id }, updateRecipeDto);

    return await this.findOne(id);
  }

  async remove(id: number, user: UserEntity): Promise<RecipeEntity> {
    const curDoctor = await this.doctorService.findByUserId(user.id);
    const recipe = await this.recipeRepo.findOne({
      where: { id },
      relations: { doctor: true },
    });

    if (recipe.doctor.id !== curDoctor.id) {
      throw new ForbiddenException(
        'You can delete only recipes created by yourself',
      );
    }

    await this.recipeRepo.delete({ id });

    return recipe;
  }
}
