import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorators/roles.decorator';
import { RequestWithUser } from '../types/request-wit-user.type';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routeRoles = this.reflector.get(Roles, context.getHandler());
    if (!routeRoles) {
      return true;
    }
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const user = request.user;

    console.log(routeRoles, user.roles)

    return this.matchRoles(routeRoles, user.roles);
  }

  matchRoles(routeRoles: Role[], userRoles: Role[]): boolean {
    if (userRoles.some((role) => routeRoles.includes(role))) {
      return true;
    }
    return false;
  }
}
