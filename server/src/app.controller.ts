import { Controller, Get, Logger, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { GetUser } from './auth/common/get-user.decorator';
import { UserEntity } from './users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  private logger = new Logger('App controller');
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {
    console.log(this.configService.get<number>('DATABASE_USER'));
  }

  @Get()
  @UsePipes()
  getHello(@GetUser() user: UserEntity): string {
    this.logger.verbose(
      `User call App User: ${JSON.stringify(user?.username ?? '-')}`,
    );
    return this.appService.getHello();
  }
}
