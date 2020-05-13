import { UserModel } from './auth.models';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { username: string; password: string }) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public payload: UserModel) {}
}

export class RefreshToken {
  static readonly type = '[Auth] RefeshToken';
  constructor(public payload: { access: string }) {}
}