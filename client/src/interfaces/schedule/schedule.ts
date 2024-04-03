import { WeekDay } from "@/enums/WeekDay";

export interface Schedule {
    id: number,
    weekDay: WeekDay,
    startTime: string,
    endTime: string,
    avgAppointmentTime: string,
}