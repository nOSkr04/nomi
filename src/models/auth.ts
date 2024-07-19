import { IAuth } from "../interfaces/auth";
import { IUser } from "../interfaces/user";

export class Auth implements IAuth {
  token: string | null;
  user: IUser | null;

  constructor({
    token,
    user,
  }: IAuth) {
    this.token = token;
    this.user = user;
  }
}
