import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './constant';
import { logger } from './middleware/app.middleware';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  await app.listen(APP_PORT, () =>
    console.log(`app is server at http://127.0.0.1:${APP_PORT}`),
  );
};
bootstrap();
