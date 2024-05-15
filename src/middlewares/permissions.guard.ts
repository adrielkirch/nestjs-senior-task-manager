import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { RoleEnum } from 'src/types/role/types';
import { Privileges } from 'src/domain/privilege/privilege';

export class PermissionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const userRole: RoleEnum = context.switchToHttp().getRequest().role;
        const request = context.switchToHttp().getRequest();
        const httpMethod = request.method;
        const routeRoles = this.getRouteRoles(context);

        const allowed = this.hasSufficientPermissions(routeRoles, userRole, httpMethod);
        if (allowed) {
            return true;
        }

        throw new ForbiddenException("Insufficient permissions");
    }

    private getRouteRoles(context: ExecutionContext): { [role in RoleEnum]: Privileges } {
        const routeRolesMap: { [route: string]: { [role in RoleEnum]: Privileges } } = {
            "/users": { [RoleEnum.GUEST]: new Privileges(true, true, true), [RoleEnum.ADMIN]: new Privileges(true, true, true), [RoleEnum.WRITER]: new Privileges(true, true, true) },
            "/tasks": { [RoleEnum.GUEST]: new Privileges(false, false, false), [RoleEnum.ADMIN]: new Privileges(true, true, true), [RoleEnum.WRITER]: new Privileges(true, true, false) },
            "/comments": { [RoleEnum.GUEST]: new Privileges(false, false, false), [RoleEnum.ADMIN]: new Privileges(true, true, true), [RoleEnum.WRITER]: new Privileges(true, true, false) },
            "/teams": { [RoleEnum.GUEST]: new Privileges(false, false, false), [RoleEnum.ADMIN]: new Privileges(true, true, true), [RoleEnum.WRITER]: new Privileges(false, false, false) },
        };

        const request = context.switchToHttp().getRequest();
        const pathname = request.url.match(/^\/[^/]+/)?.[0] || '/';

        return routeRolesMap[pathname] || {
            [RoleEnum.GUEST]: new Privileges(false, false, false),
            [RoleEnum.ADMIN]: new Privileges(false, false, false),
            [RoleEnum.WRITER]: new Privileges(false, false, false)
        };
    }

    private hasSufficientPermissions(routeRoles: { [role in RoleEnum]: Privileges }, userRole: RoleEnum, httpMethod: string): boolean {
        let hasSufficientPrivileges = false;
        if (routeRoles[userRole]) {
            const privileges = routeRoles[userRole];
            switch (httpMethod) {
                case 'GET':
                    hasSufficientPrivileges = privileges.read;
                    break;
                case 'POST':
                case 'PUT':
                    hasSufficientPrivileges = privileges.write;
                    break;
                case 'DELETE':
                    hasSufficientPrivileges = privileges.delete;
                    break;
                default:
                    hasSufficientPrivileges = false;
                    break;
            }
        }
        return hasSufficientPrivileges;
    }
}
