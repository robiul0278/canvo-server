import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@codegenie/serverless-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import express from 'express';
import { AppModule } from '../src/app.module';

let cachedServer: ReturnType<typeof serverlessExpress>;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();

    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    app.setGlobalPrefix('api', { exclude: ['/'] });

    app.enableCors({
      origin: process.env.FRONTEND_URL || '*',
      credentials: true,
    });

    app.use(helmet());
    app.use(compression());

    const config = new DocumentBuilder()
      .setTitle('CANVO - Premium Fashion E-Commerce')
      .setDescription('API documentation for CANVO fashion e-commerce platform')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.init();

    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

export const handler = async (
  event: any,
  context: any,
  callback: any,
) => {
  const server = await bootstrap();
  return server(event, context, callback);
};
