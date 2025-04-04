import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Req } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = this.extractTokenFromHeader(authorization);
    if (!token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      request.user = payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  private extractTokenFromHeader(authorization: string): string | null {
    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
