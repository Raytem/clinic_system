import { Sex } from "@/enums/Sex";

export interface SignupAsPatientDto {
    email: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    phoneNumber: string,
    birthDate: Date,
    sex: Sex,
    password: string,
    address: string,
}
