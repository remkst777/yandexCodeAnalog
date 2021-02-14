import { NestModule, MiddlewareConsumer } from "@nestjs/common";
export default class implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
