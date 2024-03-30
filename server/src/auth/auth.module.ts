import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from './jwt/jwt.service';
import { UserModule } from '../realizations/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { PatientModule } from 'src/realizations/patient/patient.module';
import { DoctorModule } from 'src/realizations/doctor/doctor.module';
import { ScheduleModule } from 'src/realizations/schedule/schedule.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
    PatientModule,
    DoctorModule,
    ScheduleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
