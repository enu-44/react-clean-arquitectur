import { UserResponseDom } from "../models/user-response.dom";
import { Failure } from "../../core/failure/failure";
import { Result } from "../../core/result/result";

export interface UserRepository{
    list(): Promise<Result<UserResponseDom[], Failure>>
}