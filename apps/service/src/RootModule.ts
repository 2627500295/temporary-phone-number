import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ResponseTimeMiddleware } from '@nest-middlewares/response-time';

import * as Joi from 'joi';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { ConnectOptions } from 'typeorm';

import { NODE_ENV } from './Infra/Constants';
import { HttpExceptionFilter } from './Infra/Filters';
import { MessageEntity, PhoneNumberEntity, ProviderEntity } from './Domain/Entities';
import { HomeController, MessageController, PhoneNumberController } from './UI/REST';

import {
  bannerConfiguration,
  clusterConfiguration,
  databaseConfiguration,
  DatabaseConfiguration,
  globalConfiguration,
  redisConfiguration,
  RedisConfiguration,
  yamlConfiguration,
} from './Infra/Config';

import { AppModule } from './App/App.Module';

@Module({
  controllers: [HomeController, PhoneNumberController, MessageController],
  imports: [
    /**
     * Configuration
     *
     * @remark
     *
     * https://docs.nestjs.com/techniques/configuration
     *
     */
    ConfigModule.forRoot({
      envFilePath: [`.env/.env.${NODE_ENV}.local`, `.env/.env.${NODE_ENV}`, `.env/.env.local`, `.env/.env`],
      load: [
        yamlConfiguration,
        globalConfiguration,
        clusterConfiguration,
        databaseConfiguration,
        redisConfiguration,
        bannerConfiguration,
      ],
      expandVariables: true,
      ignoreEnvFile: false,
      ignoreEnvVars: false,
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision', 'staging')
          .default('development'),
      }),
      validationOptions: {
        allowUnknow: false,
        abortEarly: true,
      },
    }),

    /** TypeORM */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          ...configService.get<DatabaseConfiguration>('database'),
          entityPrefix: 'tpn_',
          entities: [PhoneNumberEntity, MessageEntity, ProviderEntity],
          migrations: [],
          synchronize: NODE_ENV !== 'production',
          logging: NODE_ENV !== 'production',
        } as ConnectOptions;
      },
    }),

    /**
     * Cache manager
     *
     * @remark
     *
     * https://docs.nestjs.com/techniques/caching
     */
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService): CacheModuleOptions {
        return {
          ...configService.get<RedisConfiguration>('redis'),
          // store({ host, port, ...rest }: RedisConfiguration): Promise<any> {
          //   return redisStore({ ...rest, socket: { host, port } });
          // },
          ttl: 5,
          max: 10,
        };
      },
    }),

    /** EventEmitter */
    EventEmitterModule.forRoot({
      global: true,
    }),

    /** Passport */
    PassportModule.register({}),

    /** JSON Web Tokens */
    JwtModule.register({
      global: true,
      secret: 'TEMPsecret',
      signOptions: { expiresIn: '120s' },
    }),

    /** Application Module */
    AppModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },

    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
  ],
  exports: [],
})
export class RootModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeMiddleware).forRoutes('*');
  }
}
