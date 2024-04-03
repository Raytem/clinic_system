import { User } from "../auth/user";

export interface Patient {
    id: number,
    address: string,
    user: User,
}