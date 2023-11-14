import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { RootModule } from './RootModule';

async function bootstrap() {
  const adapter = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(
    RootModule,
    adapter,
    {
      logger: ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'],
      bodyParser: true,
      rawBody: true,
    },
  );

  await app.listen(8080, '0.0.0.0');

  const url = await app.getUrl();

  console.log('%s', url);
}

bootstrap();
