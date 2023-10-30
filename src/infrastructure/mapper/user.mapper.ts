import { UserResponseDom } from "@domain/index";
import { UserDto } from "@infrastructure/dtos/user.dto";

export class UserMapper {
    static toDom(dto: UserDto): UserResponseDom {
      return new UserResponseDom(
        dto.id,
        dto.name,
        dto.userName
      );
    }
  }