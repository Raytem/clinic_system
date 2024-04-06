import { AppointmentRecord } from "@/interfaces/appointment-record/appointment-record";
import { CreateAppointmentDto } from '../interfaces/appointment-record/create-appointment.dto';
import axios from "axios";
import { accessTokenUtil } from "@/utils/access-token.util";

class AppointmentService {
    
    async create(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentRecord> {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/appointment_record`,
             createAppointmentDto,
             {
                headers: {
                    Authorization: accessTokenUtil.getBearerString(),
                }
             }
        );
        const appointment: AppointmentRecord = res.data;

        return appointment;
    }

    async getAll(): Promise<AppointmentRecord[]> {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/appointment_record`,
             {
                headers: {
                    Authorization: accessTokenUtil.getBearerString(),
                }
             }
        );
        const appointments: AppointmentRecord[] = res.data;

        return appointments;
    }

    async delete(id: number): Promise<AppointmentRecord> {
        const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/appointment_record/${id}`,
             {
                headers: {
                    Authorization: accessTokenUtil.getBearerString(),
                }
             }
        );
        const appointment: AppointmentRecord = res.data;

        return appointment;
    }
}

export const appointmentService = new AppointmentService();