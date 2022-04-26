import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './constant';
import { httpLogger } from './middleware/logger.middleware';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(httpLogger);
  await app.listen(APP_PORT, () => console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx app is server at http://127.0.0.1:${APP_PORT}`));
};
bootstrap();
