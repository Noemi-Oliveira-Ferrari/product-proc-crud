import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { enableSwagger } from './swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: 'http://localhost:3001',
  });
  enableSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
