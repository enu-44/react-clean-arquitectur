import { HttpClientOptions, HttpClientResponse } from "..";

export interface HttpClient {
    get<Result = void>(options:HttpClientOptions): Promise<HttpClientResponse<Result>>;
    post<Result = void>(options: HttpClientOptions): Promise<HttpClientResponse<Result>>;
    put<Result = void>(options:HttpClientOptions): Promise<HttpClientResponse<Result>>;
    delete<Result = void>(options:HttpClientOptions): Promise<HttpClientResponse<Result>>;
}