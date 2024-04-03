import { timeUtil } from "@/utils/time.util";
import { z } from "zod";

export const scheduleItemSchema = z.object({
    weekDay: z.string().min(1, 'Required'),
    startTime: z.string().min(1, 'Required'),
    endTime: z.string().min(1, 'Required'),
    avgAppointmentTime: z.string().min(1, 'Required').refine(value => {
        const avgAppointmentTime = timeUtil.getTime(value);
        if (!avgAppointmentTime) {
            return false;
        }
        if (avgAppointmentTime.hours + avgAppointmentTime.minutes === 0) {
            return false;
        }
        return true;
    }, {
        message: 'Average appointment time can not be zero'
    }),
}).refine(schema => {
    const startTime = timeUtil.getTime(schema.startTime)
    const endTime = timeUtil.getTime(schema.endTime)

    if (!startTime || !endTime) {
        return false;
    }

    const startTimeMinutes = startTime.hours * 60 + startTime.minutes
    const endTimeMinutes = endTime.hours * 60 + endTime.minutes

    if (endTimeMinutes <= startTimeMinutes) {
        return false;
    }

    return true;
}, {
    message: 'The start time cannot be longer than the end time',
    path: ['startTime'],
}).refine(schema => {
    const startTime = timeUtil.getTime(schema.startTime)
    const endTime = timeUtil.getTime(schema.endTime)
    const avgAppointmentTime = timeUtil.getTime(schema.avgAppointmentTime);

    if (!startTime || !endTime || !avgAppointmentTime) {
        return false;
    }

    const startTimeMinutes = startTime.hours * 60 + startTime.minutes;
    const endTimeMinutes = endTime.hours * 60 + endTime.minutes;
    const avgAppointmentTimeMinutes = avgAppointmentTime.hours * 60 + avgAppointmentTime.minutes;

    const workMinutes = endTimeMinutes - startTimeMinutes;
    
    if (workMinutes < avgAppointmentTimeMinutes) {
        return false;
    }

    return true;
}, {
    message: 'At least one slot must be placed during the specified working hours',
    path: ['avgAppointmentTime'],
});
