
import { inject, injectable } from "inversify";
import  { Failure, NoParams, Query, Result } from "@core/index";
import {  USER_SYMBOLS, type UserRepository, UserResponseDom } from "@domain/index";
@injectable()
export class AllUsersUseCase extends Query<Promise<Result<UserResponseDom[], Failure>>,NoParams > {
    constructor(
        @inject(USER_SYMBOLS.USER_REPOSITORY)
        private readonly _userRepository: UserRepository,
    ) {
        super()
    }
    execute = (_: NoParams): Promise<Result<UserResponseDom[], Failure>> => this._userRepository.list()
}