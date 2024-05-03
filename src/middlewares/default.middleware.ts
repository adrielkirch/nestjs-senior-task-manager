import { Injectable, NestMiddleware, UnauthorizedException, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/services/service.user';
import { SecurityUtil } from 'src/utils/util.security';

declare global {
    namespace Express {
        interface Request {
            user?: any; // Define your custom property here
        }
    }
}


@Injectable()
export class DefaultMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
                throw new UnauthorizedException('Invalid or missing authorization token');
            }
            const token = authorizationHeader.split(' ')[1];
            const userId = SecurityUtil.decodedJsonwebtoken(token);
            if (!userId) {
                throw new UnauthorizedException('Invalid authorization token');
            }
            req.user = userId;
            next();
        } catch (err) {
            throw new UnauthorizedException('Invalid authorization token');
        }
            
    }
}


@Injectable()
export class ScopesGuard implements CanActivate {
    constructor(private readonly scopes: string[]) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        // Extract scopes from the request headers or wherever they are provided
        const userScopes: string[] = request.headers['scopes']?.split(',') || [];

        // Check if the user has all the required scopes
        return this.scopes.every(scope => userScopes.includes(scope));
    }
}
