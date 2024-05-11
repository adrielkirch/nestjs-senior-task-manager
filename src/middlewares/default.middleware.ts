import { Injectable, NestMiddleware, UnauthorizedException, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SecurityUtil } from 'src/utils/util.security';

 
declare global {
    namespace Express {
        interface Request {
            user?: string;
            role?: string;
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
            const decoded = SecurityUtil.decodedJsonwebtoken(token);
            if (!decoded) {
                throw new UnauthorizedException('Invalid authorization token');
            }
            console.log(decoded)
            req.user = decoded['user'];
            req.role = decoded['role'];
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
        const userScopes: string[] = request.headers['scopes']?.split(',') || [];
        return this.scopes.every(scope => userScopes.includes(scope));
    }
}
