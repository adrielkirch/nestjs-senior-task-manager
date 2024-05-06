import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';



@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector) { };
    canActivate(context: ExecutionContext): boolean {
        const [req] = context.getArgs();
        const userPermissions = req?.user?.permissions || [];
        const requiredPermissions = this.reflector.get('permissions',context.getHandler()) || [];
        const hasAllRequiredPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
        if(requiredPermissions.length ===0 || hasAllRequiredPermissions) {
            return true;
        }
       throw new ForbiddenException("Insufficient permissions");
    }
}



