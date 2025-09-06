import { EnumGender } from "@/context/enums/EnumGender";
import { Security } from "@/context/models/Security";

export interface User {
    id: number;
    firstName: string;
    lastName: string;

    birthDate: string;
    gender: EnumGender;

    username: string;
    email: string;

    password?: string;

    mobile: string;
    experience: number;
    active: boolean;

    security?: Security;

    tokenAccess?: string;

    createdAt: string;
    updatedAt: string;
}
