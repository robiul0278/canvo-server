import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as jose from 'jose';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

export interface NextAuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

@Injectable()
export class NextAuthGuard implements CanActivate {
  private secret: Uint8Array;

  constructor(private reflector: Reflector) {
    this.secret = new TextEncoder().encode(
      process.env.NEXTAUTH_SECRET || 'fallback-secret-do-not-use-in-production',
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authorization header');
    }

    const token = authHeader.substring(7);

    try {
      const { payload } = await jose.jwtVerify(token, this.secret, {
        algorithms: ['HS256'],
      });

      (request as any).user = {
        id: payload.sub || payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role || 'user',
      } as NextAuthUser;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired session token');
    }
  }
}
