import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fastify from 'fastify';
import { findAPortNotInUse } from 'portscanner';

import { ConfigService } from '@nestjs/config';
import { customBanner } from './Infra/Utils/customBanner';
import { RootModule } from './RootModule';
import { ClusterConfiguration } from './Infra/Config';

async function bootstrap() {
  // Fastify Adapter
  const instance = fastify() as FastifyAdapter['instance'];
  const adapter = new FastifyAdapter(instance);

  // App Instance
  const application = await NestFactory.create<NestFastifyApplication>(RootModule, adapter, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'],
    bodyParser: true,
    rawBody: true,
    cors: true,
  });

  // Set Global Prefix
  application.setGlobalPrefix('api');

  // Enable Versioning
  application.enableVersioning({ type: VersioningType.URI });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('TPN')
    .setDescription('Temporary phone number API service')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(application, config);
  SwaggerModule.setup('/api/docs/', application, document);

  // Config Service
  const configService = application.get(ConfigService);
  const banner = configService.get<string>('banner');
  const cluster = configService.get<ClusterConfiguration>('cluster');

  // Detect port
  const port = await findAPortNotInUse(cluster.port ?? 8080);

  // Listen
  await application.listen(port, cluster.host);

  // Output Banner
  console.log(customBanner(banner, { ...cluster, port }));
}

bootstrap();
