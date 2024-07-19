import { User } from "../models/user";
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const me = async () => {
  const res = await httpRequest.get("/users/me");
  return User.fromJson(res.data);
};
export const authMe = async () => {
  const res = await httpRequest.get("/users/me");
  return res.data;
};
export const deleteMe = async () => {
  const res = await httpRequest.post("/users/deleteAccount");
  return res.data;
};

export const login = async (data: {
  username: string;
  password: string;
  expoPushToken?: string;
}) => {
  const res = await httpRequest.post("/users/login", data);
  return res;
};

export const logout = async () => {
  const res = await httpRequest.get("/users/logout");
  return res;
};
