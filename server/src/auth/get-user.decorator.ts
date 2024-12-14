import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth as AuthEntity } from './entities/auth.entity';

export const getUser = createParamDecorator(
  (_data, ctx: ExecutionContext): AuthEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
