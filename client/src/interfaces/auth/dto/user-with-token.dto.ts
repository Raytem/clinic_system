import { User } from "../user";

export interface UserWithTokenDto {
    user: User,
    accessToken: string,
}