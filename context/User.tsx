type EnumGender = 'MALE' | 'FEMALE' | 'NOT_SPECIFIED' | 'PREFER_NOT_SAY';

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

    tokenAccess?: string;

    createdAt: string;
    updatedAt: string;
}
