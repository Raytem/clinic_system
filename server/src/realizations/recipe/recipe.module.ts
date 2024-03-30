import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { PatientModule } from '../patient/patient.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [
    PatientModule,
    DoctorModule,
    TypeOrmModule.forFeature([RecipeEntity]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule {}
