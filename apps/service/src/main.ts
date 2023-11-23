import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { RootModule } from './RootModule';
import fastify from 'fastify';

async function bootstrap() {
  const instance = fastify();

  const adapter = new FastifyAdapter(instance);

  const app = await NestFactory.create<NestFastifyApplication>(RootModule, adapter, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'],
    bodyParser: true,
    rawBody: true,
  });

  await app.listen(8080, '0.0.0.0');

  const url = await app.getUrl();

  console.log('%s', url);
}

bootstrap();
