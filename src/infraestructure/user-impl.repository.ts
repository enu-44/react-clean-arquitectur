import { injectable } from "inversify";
import { UserDto } from "./dtos/user.dto";
import { UserMapper } from "./mapper/user.mapper";
import { UserRepository, UserResponseDom } from "../domain";
import { BaseApiService, Failure, Left, Result, Right, UnknowFailure } from "../core";

@injectable()
export class UserImplRepository extends BaseApiService implements UserRepository{
    baseURL: any = import.meta.env.VITE_BASE_URL
    async list(): Promise<Result<UserResponseDom[], Failure>> {
        try {
            let result= await this.get<UserDto[]>(`${this.baseURL}/usersss`)
            return new Right<UserResponseDom[]>(result.map(UserMapper.toDom))
        } catch (error) {
            return new Left<Failure>(new UnknowFailure(`Unknow error: ${error}`))
        }
    }
}