import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export interface NextAuthUser {
    id: string;
    email: string;
    name: string;
    role: string;
}
export declare class NextAuthGuard implements CanActivate {
    private reflector;
    private secret;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
