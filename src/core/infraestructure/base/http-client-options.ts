export interface HttpClientOptions {
    url: string;
    body?: ReadableStream | XMLHttpRequestBodyInit | Object; 
    headers?: Record<string, string>;
    removeDefaultHeaders?: Array<string>;
}