import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';

const PORT = process.env.PORT || 9998;

(async function () {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
})();
