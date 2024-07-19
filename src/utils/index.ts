import { store } from "../store";
import { HttpRequest as BaseHttpRequest, HttpHandler } from "../helper";
import { authLogout } from "../store/auth-slice";

export class HttpRequest extends BaseHttpRequest {
  uri = "https://s69server.com";
  store = store;
  errorHandler = (statusCode: number, error: HttpHandler): void => {
    if (statusCode === 401) {
      store.dispatch(authLogout());
    }
    throw error;
  };
}

export const delay = async (ms = 400): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
