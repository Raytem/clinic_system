import { ApiProperty, OmitType } from '@nestjs/swagger';
import { RecipeEntity } from '../entities/recipe.entity';
import { IsInt, Min } from 'class-validator';

export class CreateRecipeDto extends OmitType(RecipeEntity, [
  'id',
  'doctor',
  'patient',
]) {
  @ApiProperty({ type: Number, minimum: 1 })
  @IsInt()
  @Min(1)
  patientId: number;
}
