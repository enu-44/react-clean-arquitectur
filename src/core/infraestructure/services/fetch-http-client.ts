import { inject, injectable } from "inversify";
import {
  HttpClient,
  HttpClientOptions,
  type DefaultHeadersProvider,
  HttpClientResponse,
} from "@core/index";

@injectable()
export class FetchHttpClient implements HttpClient {
  constructor(
    @inject("Headers")
    private readonly defaultHeaders: DefaultHeadersProvider
  ) {}
 

  get<Result = void>(options: HttpClientOptions): Promise<HttpClientResponse<Result>> {
    let request = <RequestInit>{
      method: "GET",
      headers: this.mergeHeaders(options),
    };
    return new Promise((resolve, reject) => {
      fetch(options.path, request)
        .then((response: Response) => {
          if (!response.ok) {
            reject(response);
            return;
          }
          return this.result<Result>(response)
        })
        .then((data) => resolve(data!))
        .catch((error: any) => reject(error));
    });
  }

  post<Result = void>(options: HttpClientOptions): Promise<HttpClientResponse<Result>> {
    let body = options.body;
    if (body instanceof Object) {
      body = JSON.stringify(options.body);
    }
    let request = <RequestInit>{
      method: "POST",
      body: body,
      headers: this.mergeHeaders(options),
    };
    return new Promise((resolve, reject) => {
      fetch(options.path, request)
        .then((response: Response) => {
          if (!response.ok) {
            reject(response);
            return;
          }
          return this.result<Result>(response)
        })
        .then((data) => resolve(data!))
        .catch((error: any) => reject(error));
    });
  }

  put<Result = void>(options: HttpClientOptions): Promise<HttpClientResponse<Result>> {
    let body = options.body;
    if (body instanceof Object) {
      body = JSON.stringify(options.body);
    }
    let request = <RequestInit>{
      method: "PUT",
      body: body,
      headers: this.mergeHeaders(options),
    };
    return new Promise((resolve, reject) => {
      fetch(options.path, request)
        .then((response: Response) => {
          if (!response.ok) {
            reject(response);
            return;
          }
          return this.result<Result>(response)
        })
        .then((data) => resolve(data!))
        .catch((error: any) => reject(error));
    });
  }

  delete<Result = void>(options: HttpClientOptions): Promise<HttpClientResponse<Result>> {
    let request = <RequestInit>{
      method: "DELETE",
      headers: this.mergeHeaders(options),
    };
    return new Promise((resolve, reject) => {
      fetch(options.path, request)
        .then((response: Response) => {
          if (!response.ok) {
            reject(response);
            return;
          }
          return this.result<Result>(response)
        })
        .then((data) => resolve(data!))
        .catch((error: any) => reject(error));
    });
  }

  async result<Result>(response: Response): Promise<HttpClientResponse<Result>> {
    return <HttpClientResponse<Result>>{
      data: response.status !== 204 ? await response.json(): null,
      status: response.status,
      statusText: response.statusText,
    }
  }

  private mergeHeaders(options: HttpClientOptions): Record<string, string> {
    const defaultHeaders = this.defaultHeaders.getHeaders();
    const mergedHeaders = { ...defaultHeaders, ...options.headers };
    if (options.removeDefaultHeaders) {
      options.removeDefaultHeaders.forEach((headerName) => {
        delete mergedHeaders[headerName];
      });
    }
    return mergedHeaders;
  }
}