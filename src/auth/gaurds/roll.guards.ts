import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const user = req.user;

    const isMatch = this.matchRoles(roles, user.role);
    if (!isMatch) {
      throw new ForbiddenException("you are not allowed to access this route");
    }
    return true;
  }
}
