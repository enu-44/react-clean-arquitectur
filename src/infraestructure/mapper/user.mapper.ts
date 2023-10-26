import { UserResponseDom } from "../../domain/models/user-response.dom";
import { UserDto } from "../dtos/user.dto";

export class UserMapper {
    static toDom(dto: UserDto): UserResponseDom {
      return new UserResponseDom(
        dto.id,
        dto.name,
        dto.userName
      );
    }
  }