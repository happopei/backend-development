import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // We have to use unique port number if we are running both service in one machine
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
