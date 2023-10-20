import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"], // Разрешить только загрузку с текущего источника
        scriptSrc: ["'self'", 'https://client-swart-sigma-79.vercel.app'], // Разрешить загрузку скриптов только с вашего фронтенда
        // Другие директивы по необходимости
      },
    }),
  );
  await app.listen(4545);
  console.log('Server started');
}
bootstrap();
