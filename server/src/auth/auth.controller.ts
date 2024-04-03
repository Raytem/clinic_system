import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../realizations/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../decorators/public.decorator';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserWithTokenDto } from './dto/user-with-token.dto';
import { SignupAsPatientDto } from './dto/signup-as-patient.dto';
import { SignupAsDoctorDto } from './dto/signup-as-doctor.dto';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/realizations/user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiBody({ type: SignupAsPatientDto })
  @ApiResponse({ status: 201, type: UserWithTokenDto })
  @Post('signup/patient')
  async signupAsPatient(@Body() signupAsPatientDto: SignupAsPatientDto) {
    return await this.authService.signupAsPatient(signupAsPatientDto);
  }

  @Public()
  @ApiBody({ type: SignupAsDoctorDto })
  @ApiResponse({ status: 201, type: UserWithTokenDto })
  @Post('signup/doctor')
  async signupAsDoctor(@Body() signupAsDoctorDto: SignupAsDoctorDto) {
    return await this.authService.signupAsDoctor(signupAsDoctorDto);
  }

  @Public()
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, type: UserWithTokenDto })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UserWithTokenDto })
  @Get('refresh')
  async refresh(@User() user: UserEntity) {
    return await this.authService.refresh(user);
  }
}
