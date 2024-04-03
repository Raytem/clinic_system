import { User } from "@/interfaces/auth/user";
import { makeAutoObservable } from "mobx";

class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: User) {
        this.user = user;
    }

    clearUser() {
        this.user = null;
    }
}

export const userStore = new UserStore();