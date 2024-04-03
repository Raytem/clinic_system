import { LoginDto } from "@/interfaces/auth/dto/login.dto";
import { SignupAsDoctorDto } from "@/interfaces/auth/dto/signup-as-doctor.dto";
import { SignupAsPatientDto } from "@/interfaces/auth/dto/signup-as-patient.dto";
import { UserWithTokenDto } from "@/interfaces/auth/dto/user-with-token.dto";
import { User } from "@/interfaces/auth/user";
import { accessTokenUtil } from "@/utils/access-token.util";
import axios from "axios";

class AuthService { 

    async login(loginDto: LoginDto): Promise<UserWithTokenDto> {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, loginDto);
        const user: UserWithTokenDto = res.data;

        return user;
    }

    async signupAsPatient(signupAsPatientDto: SignupAsPatientDto) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup/patient`, signupAsPatientDto);
        const user: UserWithTokenDto = res.data;

        return user;
    }

    async signupAsDoctor(signupAsDoctorDto: SignupAsDoctorDto) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup/doctor`, signupAsDoctorDto);
        const user: UserWithTokenDto = res.data;

        return user;
    }

    async refresh(): Promise<UserWithTokenDto> {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`, {
            headers: {
                Authorization: accessTokenUtil.getBearerString(),
            }
        });
        const user: UserWithTokenDto = res.data;

        return user;
    }
}

export const authService = new AuthService()