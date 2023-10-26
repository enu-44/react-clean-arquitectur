
import { UserResponseDom } from "../../domain/models/user-response.dom";
import { Failure } from "../../core/failure/failure";
import { Result } from "../../core/result/result";
import { NoParams, Query } from "../../core/usecase/query";
import type { UserRepository } from "../../domain/repository/user.repository";
import { inject, injectable } from "inversify";
import { USER_SYMBOLS } from "../../domain/symbols/user.symbols";

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