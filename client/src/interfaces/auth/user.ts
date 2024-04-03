import { Role } from "@/enums/Role";
import { Sex } from "@/enums/Sex";

export interface User {
    email: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    phoneNumber: string,
    birthDate: Date,
    sex: Sex,
    roles: Role[],
  }