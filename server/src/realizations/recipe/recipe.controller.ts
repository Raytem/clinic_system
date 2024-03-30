import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOAuth2,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RecipeEntity } from './entities/recipe.entity';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PatientRecipeFilterDto } from './dto/patient-recipe-filter.dto';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { DoctorRecipeFilterDto } from './dto/doctor-recipe-filter.dto copy';

@ApiBearerAuth()
@ApiTags('recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @ApiBody({ type: CreateRecipeDto })
  @ApiResponse({ type: RecipeEntity, status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'DOCTOR' })
  @Roles([Role.DOCTOR])
  @Post()
  async create(
    @User() user: UserEntity,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    return await this.recipeService.create(createRecipeDto, user);
  }

  @ApiResponse({
    type: RecipeEntity,
    isArray: true,
    status: HttpStatus.OK,
  })
  @ApiOperation({ summary: 'DOCTOR' })
  @Roles([Role.DOCTOR])
  @Get('doctor')
  async findByDoctor(
    @User() user: UserEntity,
    @Query() doctorFilter: DoctorRecipeFilterDto,
  ) {
    return await this.recipeService.findByDoctor(user, doctorFilter);
  }

  @ApiResponse({
    type: RecipeEntity,
    isArray: true,
    status: HttpStatus.OK,
  })
  @ApiOperation({ summary: 'PATIENT' })
  @Roles([Role.PATIENT])
  @Get('patient')
  async findByPatient(
    @User() user: UserEntity,
    @Query() patientFilter: PatientRecipeFilterDto,
  ) {
    return await this.recipeService.findByPatient(user, patientFilter);
  }

  @ApiResponse({ type: RecipeEntity, status: HttpStatus.OK })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.recipeService.findOne(id);
  }

  @ApiBody({ type: UpdateRecipeDto })
  @ApiResponse({ type: RecipeEntity, status: HttpStatus.OK })
  @ApiOperation({ summary: 'DOCTOR' })
  @Roles([Role.DOCTOR])
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @User() user: UserEntity,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return await this.recipeService.update(id, updateRecipeDto, user);
  }

  @ApiResponse({ type: RecipeEntity, status: HttpStatus.OK })
  @ApiOperation({ summary: 'DOCTOR' })
  @Roles([Role.DOCTOR])
  @Delete(':id')
  async remove(@Param('id') id: number, @User() user: UserEntity) {
    return await this.recipeService.remove(id, user);
  }
}
