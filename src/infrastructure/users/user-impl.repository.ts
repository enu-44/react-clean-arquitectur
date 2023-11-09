import { inject, injectable } from "inversify";
import { UserDto } from "./dtos/user.dto";
import { UserMapper } from "./mapper/user.mapper";
import { UserRepository, UserDom } from "../../domain/users";
import { Failure, HTTP_CLIENT_SYMBOLS, type HttpClient, HttpClientOptions, UnknowFailure, Result, Right, Left, NoResult } from "@core/index";
import { CreateUserRequestDom, UpdateUserRequestDom } from "@domain/users/models/user-request.dom";

@injectable()
export class UserImplRepository implements UserRepository {
    baseURL: any = import.meta.env.VITE_BASE_URL
    constructor(
        @inject(HTTP_CLIENT_SYMBOLS.FETCH)
        private readonly httpClient: HttpClient,
    ) {}
   
    async list(): Promise<Result<UserDom[], Failure>> {
        try {
            const options = <HttpClientOptions>{
                path: `${this.baseURL}/users`,
                removeDefaultHeaders: ['Authorization']
            };
            let result = await this.httpClient.get<UserDto[]>(options)
            return new Right<UserDom[]>(result.data.map(UserMapper.toDom))
        } catch (error) {
            return new Left<Failure>(new UnknowFailure(`Unknow error: ${error}`))
        }
    }

    async create(request: CreateUserRequestDom): Promise<Result<UserDom, Failure>> {
        try {
            const options = <HttpClientOptions>{
                path: `${this.baseURL}/users`,
                body: UserMapper.toCreateDto(request),
            };
            let result = await this.httpClient.get<UserDto>(options)
            return new Right<UserDom>(UserMapper.toDom(result.data))
        } catch (error) {
            return new Left<Failure>(new UnknowFailure(`Unknow error: ${error}`))
        }
    }

    async update(request: UpdateUserRequestDom): Promise<Result<UserDom, Failure>> {
         try {
            const options = <HttpClientOptions>{
                path: `${this.baseURL}/users/${request.id}`,
                body: UserMapper.toUpdateDto(request),
            };
            let result = await this.httpClient.put<UserDto>(options)
            return new Right<UserDom>(UserMapper.toDom(result.data))
        } catch (error) {
            return new Left<Failure>(new UnknowFailure(`Unknow error: ${error}`))
        }
    }
    
    async deleteById(id: number): Promise<Result<NoResult, Failure>> {
         try {
            const options = <HttpClientOptions>{
                path: `${this.baseURL}/users/${id}`,
            };
            await this.httpClient.delete<void>(options)
            return new Right<NoResult>(NoResult)
        } catch (error) {
            return new Left<Failure>(new UnknowFailure(`Unknow error: ${error}`))
        }
    }
}