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
        const id = req.params.id;
        req.user = id;

        if (!SecurityUtil.isValidAuthorization(req)) {
            throw new UnauthorizedException('Unauthorized');
        }

        next();
    }
}


