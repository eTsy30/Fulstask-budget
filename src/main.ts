import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: ['https://client-budget.vercel.app'] }));
  await app.listen(4545);
  console.log('Server started');
}
bootstrap();
