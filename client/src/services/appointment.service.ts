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
        console.log(appointment)

        return appointment;
    }
}

export const appointmentService = new AppointmentService();