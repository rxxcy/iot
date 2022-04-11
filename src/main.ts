import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './constant';
import { logger } from './middleware/app.middleware';
// import { WsAdapter } from './socket/adapter';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  // app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(APP_PORT, () =>
    console.log(`app is server at http://127.0.0.1:${APP_PORT}`),
  );
};
bootstrap();
