import { Role } from "src/auth/constants/role.enum";

export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  name: string;
  lastname: string;
  admin: boolean;
}
