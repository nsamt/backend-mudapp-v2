import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../constants/role.enum';
// import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean 
  //  Promise<boolean> 
  //| Observable<boolean> 
  {
    //CÓDIGO DE BELÉN DE NESTJS DOC
    const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log(requiredRoles);
    
    if(!requiredRoles){

      return true;
    }
 
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    
    if(user.admin) return true;
    if (!user.admin) throw new UnauthorizedException();

    
    
    // return requiredRoles.some((role)=> user.roles?.includes(role));
    // return requiredRoles.some(() => user.role);
    // return requiredRoles.includes(user.role) código final de Raúl para que de autorización al role admin del usuario
  }
}
