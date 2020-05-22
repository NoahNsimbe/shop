export interface AuthStateModel {
    access: string | null;
    refresh: string | null;
    user: UserModel;
    loginForm?: any;
    signupForm?: any;
}

export interface UserModel {
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    password?: string | null;
    phone?: string | null;
    location?: string | null;
}

export interface LoginModel {
    username: string | null;
    password: string | null;
}

export interface SignupModel {
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    password?: string | null;
    phone?: string | null;
}