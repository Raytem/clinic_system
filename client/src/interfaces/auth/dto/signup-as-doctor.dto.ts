import { Sex } from "@/enums/Sex";
import { Schedule } from "@/interfaces/schedule/schedule";

export interface SignupAsDoctorDto {
    email: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    phoneNumber: string,
    birthDate: Date,
    sex: Sex,
    password: string,
    specialty: string,
    careerStartDate: Date,
    schedule: Schedule[],
  }
