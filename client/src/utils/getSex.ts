import { Sex } from "@/enums/Sex";

export function getSex(sex: Sex): string {
    if (sex === Sex.FEMALE) return 'Female';
    if (sex === Sex.MALE) return 'Male';
}