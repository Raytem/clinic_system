import { LocalStorageItem } from "@/enums/LocalStorageItem";

class AccessTokenUtil {
    set(value: string): void {
        localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, value);
    }

    get(): string | null {
        return localStorage.getItem(LocalStorageItem.ACCESS_TOKEN);
    }

    clear(): void {
        localStorage.removeItem(LocalStorageItem.ACCESS_TOKEN);
    }

    getBearerString(): string {
        return `Bearer ${this.get() || ''}`;
    }
}

export const accessTokenUtil = new AccessTokenUtil();