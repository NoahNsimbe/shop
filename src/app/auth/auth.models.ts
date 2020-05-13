export interface AuthStateModel {
    username: string | null;
    access: string | null;
    refresh: string | null;
}

export interface UserModel {
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    password?: string | null;
    phone?: string | null;
}