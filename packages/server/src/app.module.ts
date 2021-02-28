import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { LoggerMiddleware } from './middlewares/logger';
import ChannelModule from './modules/channel/module';
import SocketsModule from './modules/sockets/module';
import UsersModule from './modules/users/module';

@Module({ imports: [ChannelModule, SocketsModule, UsersModule] })
export default class implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
