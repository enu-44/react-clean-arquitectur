import { HttpClientOptions } from "..";

export interface HttpClient {
    get<Result = void>(options:HttpClientOptions): Promise<Result>;
    post<Result = void>(options:HttpClientOptions): Promise<Result>;
}