import { Failure, Result } from "@core/index";
import { UserResponseDom } from "../models/user-response.dom";
export interface UserRepository{
    list(): Promise<Result<UserResponseDom[], Failure>>
}