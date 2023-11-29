import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { RootModule } from './RootModule';
import fastify from 'fastify';
import { VersioningType } from '@nestjs/common';
import { customBanner } from '@infra/Utils/customBanner';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const instance = fastify();

  const adapter = new FastifyAdapter(instance);

  const application = await NestFactory.create<NestFastifyApplication>(RootModule, adapter, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'],
    bodyParser: true,
    rawBody: true,
    cors: true,
  });

  application.setGlobalPrefix('api');

  application.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  const config = new DocumentBuilder()
    .setTitle('Dictionary')
    .setDescription('The dictionary API description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(application, config);
  SwaggerModule.setup('/api/docs', application, document);

  const cluster = {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 8000,
  };

  await application.listen(cluster.port, cluster.host);

  const banner: string = `

                               .__
        _____  _____   ______  |__|
       /     \\ \\__  \\  \\____ \\ |  |
      |  Y Y  \\ / __ \\_|  |_> >|  |
      |__|_|  /(____  /|   __/ |__|
            \\/      \\/ |__|

    \x1B[35m🌴 Server running at: http://{{host}}:{{port}}\x1B[0m
    Press CTRL-C to stop
  `;

  console.log(customBanner(banner, cluster));
}

bootstrap();
