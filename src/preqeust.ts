import * as request from "request";
import { OptionsWithUrl, RequestResponse } from "request";

function isErrorStatus(statusCode?: number) {
  return statusCode && 400 <= statusCode && statusCode < 600;
}

export type PromiseResponse = Promise<RequestResponse>;

export function promiseRequest(options: OptionsWithUrl, rejectOnErrorStatus: boolean): PromiseResponse {

  return new Promise((resolve, reject) => {
      request(options, (error: Error, response: RequestResponse, body: any) => {
          if (error) {
              reject(error);
              return;
          }

          if (rejectOnErrorStatus && isErrorStatus(response.statusCode)) {
              const statusError: any = new Error(`StatusCodeError: ${response.statusCode} - ${response.statusMessage}`);
              statusError.response = response;
              reject(statusError);
          } else {
              resolve(response);
          }
      });
  });
}
