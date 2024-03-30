import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DoctorEntity } from './entities/doctor.entity';
import { Public } from 'src/decorators/public.decorator';
import { TimeSlotsFilterDto } from './dto/time-slots-filter.dto';
import { TimeSlot } from './types/time-slot';

@ApiTags('doctor')
@Public()
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiResponse({ status: 200, type: TimeSlot, isArray: true })
  @Get(':id/time_slots')
  async getTimeSlots(
    @Param('id') id: number,
    @Query() timeSlotsFilterDto: TimeSlotsFilterDto,
  ) {
    return await this.doctorService.getTimeSlots(id, timeSlotsFilterDto);
  }

  @ApiResponse({ status: 200, type: DoctorEntity, isArray: true })
  @Get()
  async findAll() {
    return await this.doctorService.findAll();
  }

  @ApiResponse({ status: 200, type: DoctorEntity })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.doctorService.findOne(id);
  }
}
