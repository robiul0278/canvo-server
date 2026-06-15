import { NextAuthUser } from '../guards/nextauth.guard';
export declare const CurrentUser: (...dataOrPipes: (keyof NextAuthUser | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
