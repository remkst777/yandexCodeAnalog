import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";

import { LoggerMiddleware } from "./middlewares/logger";
import ChannelModule from "./modules/channel/module";
import SocketsModule from "./modules/sockets/module";

@Module({ imports: [ChannelModule, SocketsModule] })
export default class implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
