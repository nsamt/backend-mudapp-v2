import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async verifyPassword(password: string, hash: string){
    return compare (password, hash);
  }

  async validateUser(username: string, pass: string){
    const user = await this.userService.findUser(username);
    let passwordVerified: boolean;

    if(user) passwordVerified = await this.verifyPassword(pass, user.password);
    if(!user || !passwordVerified) throw new UnauthorizedException();
    // console.log(user);
    
    const {password, ...result} = user;
    return result;
  }

  async signin(user: User){
    const payload = {username: user.username, sub: user.id, role: user.admin};
    return {
        access_token: this.jwtService.sign(payload),
    }
  }
}
