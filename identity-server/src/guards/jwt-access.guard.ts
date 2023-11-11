import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import authConstants from 'src/authentication/auth-constants';
import { throws } from 'assert';
@Injectable()
export class JwtGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        let request = context.switchToHttp().getRequest();
        const tokenData = request.headers.authorization?.split('Bearer')[1].trim() as string;
        try {
            const dataUser = jwt.verify(tokenData, authConstants.jwt.secrets.accessToken)//authConstants.jwt.secrets.accessToken); 
            request.user = dataUser
            return true;
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                //console.log('Token has expired');
                throw new HttpException('Token has expired', HttpStatus.FORBIDDEN);
            } else if (err instanceof jwt.JsonWebTokenError) {
               // console.log('Invalid token');
                throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
            }
            return false;
        }
    }
}

