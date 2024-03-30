import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientEntity } from './entities/patient.entity';

@ApiBearerAuth()
@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiResponse({ type: PatientEntity, isArray: true })
  @Get()
  async findAll() {
    return await this.patientService.findAll();
  }

  @ApiResponse({ type: PatientEntity })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.patientService.findOne(id);
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
  //   return await this.patientService.update(+id, updatePatientDto);
  // }
}
