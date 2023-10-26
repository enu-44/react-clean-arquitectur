import { inject, injectable } from "inversify";
import { RequestInterceptor } from "./interceptor/request-interceptor";

@injectable()
export abstract class BaseApiService {

  constructor(@inject(RequestInterceptor) private interceptor: RequestInterceptor) {}
  
  get<Result = void>(url: string): Promise<Result> {
    let request = <RequestInit>{
      method: "GET",
    }
    this.interceptor.intercept(request)
    return new Promise((resolve, reject) => {
        fetch(url,request).then((response: Response) => {
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
  
  async post<Result = void>(url: string, data: any): Promise<Result> {
    let request = <RequestInit>{
      method: "POST",
      body: JSON.stringify(data)
    }
    this.interceptor.intercept(request)
    return new Promise((resolve, reject) => {
      fetch(url, request).then((response: Response) => {
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
}
