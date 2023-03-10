import { NestFactory } from '@nestjs/core';
import { Logger, Module, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServeStaticModule } from '@nestjs/serve-static';
import helmet from 'helmet';
import { join } from 'path';
import { ApiModule } from './api.module';
import { ExceptionFilter } from './filter/exception.filter';

@Module({
  imports: [
    ApiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/docs',
    }),
  ],
})
export class AppModule {}

(async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  // Middlewares
  app.use(helmet());
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.use(require('express-basic-auth')({ users: { [`${process.env.API_USERNAME}`]: `${process.env.API_PASSWORD}` }, challenge: true }));
  app.useGlobalFilters(new ExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // Swagger-OpenAPI
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Fugu - Email Summarizer Using sentiment analysis and OpenAI GPT-3')
      .setDescription('Fugu - Email Summarizer Using sentiment analysis and OpenAI GPT-3')
      .setVersion('v1')
      .build(),
  );

  SwaggerModule.setup('docs', app, document);

  Logger.log('Mapped {/docs, GET} Swagger docs route', 'RouterExplorer');

  await app.listen(process.env.NODE_PORT || 3001);
})();
