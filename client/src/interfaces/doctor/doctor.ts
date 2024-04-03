import { User } from "../auth/user";
import { Schedule } from "../schedule/schedule";

export interface Doctor {
    id: number,
    specialty: string,
    careerStartDate: Date,
    user: User,
    schedule: Schedule[],
}