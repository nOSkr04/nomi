import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const authMe = async () => {
  const res = await httpRequest.get("/users/me");
  return res.data;
};
