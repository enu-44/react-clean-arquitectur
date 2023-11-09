export interface HttpClientOptions {
    path: string;
    body?: ReadableStream | XMLHttpRequestBodyInit | Object; 
    headers?: Record<string, string>;
    removeDefaultHeaders?: Array<string>;
}
export interface HttpClientResponse<T = unknown> {
    data: T;
    status: number;
    statusText: string;
}