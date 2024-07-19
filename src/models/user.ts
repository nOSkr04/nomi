import { IUser } from "../interfaces/user";

export class User implements IUser {
  _id: string;
  username: string;
  role: "admin" | "user";
  expoPushToken: string;

  constructor({ _id, username, role, expoPushToken }: IUser) {
    this._id = _id;
    this.username = username;
    this.role = role;
    this.expoPushToken = expoPushToken;
  }

  static fromJson(json: IUser) {
    return new User(json);
  }
}
