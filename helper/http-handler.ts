/* eslint-disable no-undef */
interface ErrorMessage {
  code: string;
  error: string;
  message: string;
}

class HttpHandler {
  statusCode: number;
  code: string | undefined;
  error: string | undefined;
  message: string | undefined;
  payload: any | undefined;
  
  constructor (statusCode: number, errorMessage?: ErrorMessage) {
    const { code, error, message, ...rest } = errorMessage || {};
    this.statusCode = statusCode;
    this.code = code;
    this.error = error;
    this.message = message;
    this.payload = rest;
  }

  async handle (res: Response) {
    let data;

    try {
      try {
        data = await res.json();
      } catch (err) {
        data = await res.text();
      }
    } catch (err) {
      //
    }

    switch (this.statusCode) {
      case 200:
      case 304:
        return data;
      default: 
        throw new HttpHandler(this.statusCode, data);
    }
  }
}

export default HttpHandler;