import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './realizations/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PaginationModule } from './pagination/pagination.module';
import { datasourceOptions } from 'db/data-source';
import { DoctorModule } from './realizations/doctor/doctor.module';
import { AppointmentRecordModule } from './realizations/appointment-record/appointment-record.module';
import { PatientModule } from './realizations/patient/patient.module';
import { RecipeModule } from './realizations/recipe/recipe.module';
import { ScheduleModule } from './realizations/schedule/schedule.module';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(datasourceOptions),
    AuthModule,
    UserModule,
    DoctorModule,
    AppointmentRecordModule,
    PatientModule,
    RecipeModule,
    ScheduleModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      useValue: {
        transform: true,
      },
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
