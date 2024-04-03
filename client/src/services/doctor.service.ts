import { Doctor } from "@/interfaces/doctor/doctor";
import { TimeSlot } from "@/interfaces/schedule/timeSlot";
import axios from "axios";

class DoctorService {
    async getAll(): Promise<Doctor[]> {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor`);
        return res.data;
    }

    async getOne(id: number): Promise<Doctor> {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/${id}`);
        return res.data;
    }

    async getTimeSlots(id: number, date: Date): Promise<TimeSlot[]> {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/${id}/time_slots`, {
            params: {
                date,
            }
        });
        return res.data;
    }
}

export const doctorService = new DoctorService();