import {Logger, ValidationError, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {GlobalFallbackFilter, HttpExceptionFilter, ValidationException, ValidationFilter} from "@bb/backend/core";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('BrainBirds Academy')
    .setDescription('School Transport System API')
    .setContact('FullEffect Studio', 'www.schooljunction.com', 'tech@fulleffect.studio')
    .setVersion('0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors()
  // app.use(cookieParser());



  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(
          (error) => `${Object.values(error.constraints).join(",")}`
        );
        return new ValidationException(messages);
      }
    })
  );

  app.useGlobalFilters(
    new GlobalFallbackFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter()
  );



  const port = process.env.PORT || 4002;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
