import { inject, injectable } from "inversify";
import {
  HttpClient,
  HttpClientOptions,
  type DefaultHeadersProvider,
} from "@core/index";

@injectable()
export class FetchHttpClient implements HttpClient {
  constructor(
    @inject("Headers")
    private readonly defaultHeaders: DefaultHeadersProvider
  ) {}

  get<Result = void>(options: HttpClientOptions): Promise<Result> {
    let request = <RequestInit>{
      method: "GET",
      headers: this.mergeHeaders(options),
    };
    return new Promise((resolve, reject) => {
      fetch(options.url, request)
        .then((response: Response) => {
          if (!response.ok) {
            reject(response);
            return;
          }
          return response.json();
        })
        .then((data: Result) => resolve(data))
        .catch((error: any) => reject(error));
    });
  }

  async post<Result = void>(options: HttpClientOptions): Promise<Result> {
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
      fetch(options.url, request)
        .then((response: Response) => {
          if (!response.ok) {
            reject(response);
            return;
          }
          return response.json();
        })
        .then((data: Result) => resolve(data))
        .catch((error: any) => reject(error));
    });
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
