import { phoneRegex } from "validation-schemas/regex/phone";
import { z } from "zod";
import { Sex } from '@/enums/Sex';

export const notFutureDate = (value: Date) => {
    return value <= new Date();
};

export const signupAsPatientSchema = z.object({
    firstName: z.string().min(1, 'Required').max(20),
    lastName: z.string().min(1, 'Required').max(20),
    patronymic: z.string().min(1, 'Required').max(20),
    phoneNumber: z.string().regex(phoneRegex, 'Invalid phone number'),
    birthDate: z.coerce.date().refine(notFutureDate, {
        message: 'Birth date cant`t be in the future',
    }),
    sex: z.string().min(1, 'Required'),
    email: z.string().email(),
    password: z.string().min(4).max(32),
    address: z.string().min(1, 'Required').max(50),
})