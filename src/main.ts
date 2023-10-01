import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import serverless = require('serverless-http'); //

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(4545);
  console.log('Server started');
  const expressApp = app.getHttpAdapter().getInstance(); //
  return serverless(expressApp); //
}
bootstrap();

let server;
export const handler = async (event, context, callback) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
