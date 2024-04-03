import { Doctor } from "../doctor/doctor";
import { Patient } from "../patient/patient";

export interface AppointmentRecord {
    id: number,
    dateTime: Date,
    doctor: Doctor,
    patient: Patient,
}