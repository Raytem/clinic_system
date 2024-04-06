import { Patient } from "@/interfaces/patient/patient";
import { accessTokenUtil } from "@/utils/access-token.util";
import axios from "axios";

class PatientService {
    async getAll(): Promise<Patient[]> {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient`,
        {
           headers: {
               Authorization: accessTokenUtil.getBearerString(),
           }
        });
        return res.data;
    }

    async getOne(id: number): Promise<Patient> {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/${id}`,
        {
           headers: {
               Authorization: accessTokenUtil.getBearerString(),
           }
        });
        return res.data;
    }
}

export const patientService = new PatientService();