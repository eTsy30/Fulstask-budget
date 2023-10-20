import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(
    cors({
      origin: ['https://client-swart-sigma-79.vercel.app'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Если вы используете сессии или аутентификацию
    }),
  );
  await app.listen('https://fulstask-budget.vercel.app' || 4545);
  console.log('Server started');
}
bootstrap();
