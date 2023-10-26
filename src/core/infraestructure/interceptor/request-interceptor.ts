import { injectable } from "inversify";

@injectable()
export class RequestInterceptor {
    constructor() {}
    intercept(options: RequestInit): void {
        options.headers = options.headers || {};
        options.headers = {
            ...options.headers,
            "Content-Type": "application/json",
            "Autorization": "Bearer 12345"
        }
    }
}
  