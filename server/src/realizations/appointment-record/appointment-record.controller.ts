import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { AppointmentRecordService } from './appointment-record.service';
import { CreateAppointmentRecordDto } from './dto/create-appointment-record.dto';
import { UpdateAppointmentRecordDto } from './dto/update-appointment-record.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppointmentRecordEntity } from './entities/appointment-record.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from '../user/entities/user.entity';

@ApiBearerAuth()
@ApiTags('appointment_record')
@Controller('appointment_record')
export class AppointmentRecordController {
  constructor(
    private readonly appointmentRecordService: AppointmentRecordService,
  ) {}

  @ApiBody({ type: CreateAppointmentRecordDto })
  @ApiResponse({ status: 201, type: AppointmentRecordEntity })
  @ApiOperation({ summary: 'PATIENT' })
  @Roles([Role.PATIENT])
  @Post()
  async create(
    @User() user: UserEntity,
    @Body() createAppointmentRecordDto: CreateAppointmentRecordDto,
  ) {
    return this.appointmentRecordService.create(
      createAppointmentRecordDto,
      user,
    );
  }

  @ApiResponse({
    type: AppointmentRecordEntity,
    isArray: true,
    status: HttpStatus.OK,
  })
  @ApiOperation({ summary: 'DOCTOR, PATIENT' })
  @Roles([Role.DOCTOR, Role.PATIENT])
  @Get()
  async findByDoctorOrDoctor(@User() user: UserEntity) {
    if (user.roles.includes(Role.DOCTOR)) {
      return this.appointmentRecordService.findByDoctor(user);
    } else if (user.roles.includes(Role.PATIENT)) {
      return this.appointmentRecordService.findByPatient(user);
    }
  }

  @ApiResponse({ type: AppointmentRecordEntity, status: HttpStatus.OK })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.appointmentRecordService.findOne(id);
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateAppointmentRecordDto: UpdateAppointmentRecordDto,
  // ) {
  //   return this.appointmentRecordService.update(id, updateAppointmentRecordDto);
  // }

  @ApiOperation({ summary: 'PATIENT' })
  @Roles([Role.PATIENT])
  @Delete(':id')
  async remove(@Param('id') id: number, @User() user: UserEntity) {
    return this.appointmentRecordService.remove(id, user);
  }
}
