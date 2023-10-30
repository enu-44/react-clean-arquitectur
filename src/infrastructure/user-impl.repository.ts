import { inject, injectable } from "inversify";
import { UserDto } from "./dtos/user.dto";
import { UserMapper } from "./mapper/user.mapper";
import { UserRepository, UserResponseDom } from "../domain";
import { Failure, HTTP_CLIENT_SYMBOLS, type HttpClient, HttpClientOptions, UnknowFailure, Result, Right, Left } from "@core/index";

@injectable()
export class UserImplRepository implements UserRepository {
    baseURL: any = import.meta.env.VITE_BASE_URL
    constructor(
        @inject(HTTP_CLIENT_SYMBOLS.FETCH)
        private readonly httpClient: HttpClient,
    ) {
    }

    async list(): Promise<Result<UserResponseDom[], Failure>> {
        try {
            const options = <HttpClientOptions>{
                url: `${this.baseURL}/users`,
                removeDefaultHeaders: ['Authorization']
            };
            let result = await this.httpClient.get<UserDto[]>(options)
            return new Right<UserResponseDom[]>(result.map(UserMapper.toDom))
        } catch (error) {
            return new Left<Failure>(new UnknowFailure(`Unknow error: ${error}`))
        }
    }
}