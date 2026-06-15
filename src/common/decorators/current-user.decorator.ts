import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NextAuthUser } from '../guards/nextauth.guard';

export const CurrentUser = createParamDecorator(
  (data: keyof NextAuthUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as NextAuthUser;
    return data ? user?.[data] : user;
  },
);
