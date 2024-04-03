import { phoneRegex } from "validation-schemas/regex/phone";
import { z } from "zod";
import { notFutureDate } from "./signup-as-patient.schema";
import { scheduleItemSchema } from '@/validation-schemas/auth/schedule-item.schema'

export const signupAsDoctorSchema = z.object({
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
    specialty: z.string().min(1, 'Required').max(50),
    careerStartDate: z.coerce.date().refine(notFutureDate, {
        message: 'Career start date cant`t be in the future',
    }),
    schedule: z.array(scheduleItemSchema).min(1),
})
.refine(schema => {
    if (!schema.schedule.length) {
        return false;
    }

    const uniqueWeekDays = new Set();

    for (const scheduleItem of schema.schedule) {
        if (uniqueWeekDays.has(scheduleItem.weekDay) && scheduleItem.weekDay !== '0') {
            return false;
        }

        uniqueWeekDays.add(scheduleItem.weekDay);
    }

    return true;
}, {
    message: 'Select a different week days in schedule',
    path: ['schedule'],
})