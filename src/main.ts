import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  // app.enableCors(false);

  // app.use(helmet());
  // app.use(
  //   helmet.contentSecurityPolicy({
  //     directives: {
  //       defaultSrc: ["'self'"], // Разрешить только загрузку с текущего источника
  //       scriptSrc: ["'self'", 'https://client-budget.vercel.app'], // Разрешить загрузку скриптов только с вашего фронтенда
  //       // Другие директивы по необходимости
  //     },
  //   }),
  // );
  await app.listen(4545);
  console.log('Server started');
}
bootstrap();
