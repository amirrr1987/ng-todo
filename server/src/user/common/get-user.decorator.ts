import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth as AuthEntity } from '../entities/user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): AuthEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
