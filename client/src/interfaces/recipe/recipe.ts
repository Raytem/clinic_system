import { Doctor } from "../doctor/doctor";
import { Patient } from "../patient/patient";

export interface Recipe {
    id: number,
    drugName: string,
    instructionForUsage: string,
    patient: Patient,
    doctor: Doctor,
}