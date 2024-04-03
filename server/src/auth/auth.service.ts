import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../realizations/user/user.service';
import { CreateUserDto } from '../realizations/user/dto/create-user.dto';
import { JwtService } from './jwt/jwt.service';
import { UserWithTokenDto } from './dto/user-with-token.dto';
import { SignupAsDoctorDto } from './dto/signup-as-doctor.dto';
import { SignupAsPatientDto } from './dto/signup-as-patient.dto';
import { DoctorService } from 'src/realizations/doctor/doctor.service';
import { PatientService } from 'src/realizations/patient/patient.service';
import { DataSource, QueryRunner } from 'typeorm';
import { ScheduleService } from 'src/realizations/schedule/schedule.service';
import { Role } from '../enums/role.enum';
import { UserEntity } from 'src/realizations/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private scheduleService: ScheduleService,
    private jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

  async validate(userId: number) {
    const user = await this.userService.findOne({ id: userId });
    return user;
  }

  async signupAsPatient(
    signupAsPatientDto: SignupAsPatientDto,
  ): Promise<UserWithTokenDto> {
    const password = await bcrypt.hash(signupAsPatientDto.password, 5);
    const roles = [Role.PATIENT];

    let user;
    await this.dataSource.manager.transaction(
      async (transactionalEntityManager) => {
        user = await this.userService.create(
          { ...signupAsPatientDto, password, roles },
          transactionalEntityManager,
        );
        await this.patientService.create(
          { address: signupAsPatientDto.address, user },
          transactionalEntityManager,
        );
      },
    );

    const accessToken = this.jwtService.generateAccessToken(user.id);

    return {
      user,
      accessToken,
    };
  }

  async signupAsDoctor(
    signupAsDoctorDto: SignupAsDoctorDto,
  ): Promise<UserWithTokenDto> {
    const password = await bcrypt.hash(signupAsDoctorDto.password, 5);
    const roles = [Role.DOCTOR];

    let user;
    await this.dataSource.manager.transaction(
      async (transactionalEntityManager) => {
        user = await this.userService.create(
          { ...signupAsDoctorDto, password, roles },
          transactionalEntityManager,
        );
        const doctor = await this.doctorService.create(
          { ...signupAsDoctorDto, user },
          transactionalEntityManager,
        );

        const scheduleWithDoctor = signupAsDoctorDto.schedule.map(
          (schedule) => ({ ...schedule, doctor }),
        );
        await this.scheduleService.createMany(
          scheduleWithDoctor,
          transactionalEntityManager,
        );
      },
    );

    const accessToken = this.jwtService.generateAccessToken(user.id);
    return {
      user,
      accessToken,
    };
  }

  async login(loginDto: LoginDto): Promise<UserWithTokenDto> {
    const user = await this.userService.findOne({ email: loginDto.email });
    const passwordIsCorrect = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordIsCorrect) {
      throw new BadRequestException('invalid password');
    }

    const accessToken = this.jwtService.generateAccessToken(user.id);

    return {
      user,
      accessToken,
    };
  }

  async refresh(reqUser: UserEntity): Promise<UserWithTokenDto> {
    const user = await this.userService.findOne({ id: reqUser.id });
    const accessToken = this.jwtService.generateAccessToken(user.id);
    
    return {
      user,
      accessToken,
    };
  }
}
