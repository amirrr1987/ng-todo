import { Controller, Get, Logger, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { GetUser } from './auth/common/get-user.decorator';
import { UserEntity } from './users/entities/user.entity';

@Controller()
export class AppController {
  private logger = new Logger('App controller');
  constructor(private readonly appService: AppService) {}

  @Get()
  @UsePipes()
  getHello(@GetUser() user: UserEntity): string {
    this.logger.verbose(
      `User call App User: ${JSON.stringify(user?.username ?? '-')}`,
    );
    return this.appService.getHello();
  }
}
