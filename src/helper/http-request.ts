/* eslint-disable no-undef */
import type { Store } from "redux";
import qs from "qs";
import HttpHandler from "./http-handler";

type Options = {
  method: string;
  contentType?: string;
};

type JSONobj = {
  [key: string]: string | number | boolean | undefined | null | JSONobj | JSONobj[] | Blob;
};

class HttpRequest {
  uri?: string;
  store?: Store;
  errorHandler?: (statusCode: number, error: HttpHandler) => void;

  constructor (errorHandler?: (statusCode: number, error: HttpHandler) => void) {
    this.errorHandler = errorHandler;
  }

  async request (api: string, data: JSONobj, options: Options) {
    if (!this.store) {
      throw new Error("No store found");
    }

    if (!this.uri) {
      throw new Error("No uri found");
    }

    const state = this.store.getState();

    const defaultOptions: RequestInit = {
      credentials: "include",
      method     : options.method,
      headers    : {
        Accept        : "application/json",
        "Content-Type": "application/json; charset=utf-8",
        // "X-Device"    : deviceToken,
        // Authorization : token ? `Bearer ${token}` : "",
      },
    };

    if (state.auth && state.auth.token && typeof state.auth.token === "string") {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        Authorization: `Bearer ${state.auth.token}`,
      };
    }

    if (state.auth && state.auth.deviceToken && typeof state.auth.deviceToken === "string") {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        "X-Device": state.auth.deviceToken,
      };
    }

    if (options.contentType === "multipart/form-data") {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        ["Content-Type"]: options.contentType,
      };

      defaultOptions.body = data as BodyInit_;
    } else {
      defaultOptions.body = JSON.stringify(data) as BodyInit_;
    }

    let queryString = "";

    if (options.method === "GET") {
      delete defaultOptions.body;
      queryString = `?${qs.stringify(data)}`;
    }

    try {
      const res = await fetch(`${this.uri}${api}${queryString}`, defaultOptions);
      const http = new HttpHandler(res.status);

      const response = await http.handle(res);

      return response;
    } catch (ex) {
      if (this.errorHandler) {
        this.errorHandler((ex as HttpHandler).statusCode, ex as HttpHandler);
        return;
      }

      throw ex as HttpHandler;
    }
  }

  get (api: string, data?: JSONobj) {
    return this.request(api, data || {}, { method: "GET" });
  }

  post (api: string, data?: JSONobj) {
    return this.request(api, data || {}, { method: "POST" });
  }

  put (api: string, data?: JSONobj) {
    return this.request(api, data || {}, { method: "PUT" });
  }

  del (api: string, data?: JSONobj) {
    return this.request(api, data || {}, { method: "DELETE" });
  }

  upload (api: string, data?: JSONobj) {
    return this.request(api, data || {}, { method: "POST", contentType: "multipart/form-data" });
  }

  uploadImage (api: string, data?: JSONobj) {
    return this.request(api, data || {}, { method: "PUT", contentType: "multipart/form-data" });
  }
}

export default HttpRequest;
