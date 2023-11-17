import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    // другие разрешенные заголовки и методы...
    next();
  });

  await app.listen(4545);
  console.log('Server started');
}
bootstrap();
