import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../realizations/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../decorators/public.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserWithTokenDto } from './dto/user-with-token.dto';
import { SignupAsPatientDto } from './dto/signup-as-patient.dto';
import { SignupAsDoctorDto } from './dto/signup-as-doctor.dto';

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignupAsPatientDto })
  @ApiResponse({ status: 201, type: UserWithTokenDto })
  @Post('signup/patient')
  async signupAsPatient(@Body() signupAsPatientDto: SignupAsPatientDto) {
    return await this.authService.signupAsPatient(signupAsPatientDto);
  }

  @ApiBody({ type: SignupAsDoctorDto })
  @ApiResponse({ status: 201, type: UserWithTokenDto })
  @Post('signup/doctor')
  async signupAsDoctor(@Body() signupAsDoctorDto: SignupAsDoctorDto) {
    return await this.authService.signupAsDoctor(signupAsDoctorDto);
  }

  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, type: UserWithTokenDto })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
