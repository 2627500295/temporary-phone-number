import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { NODE_ENV } from '@infra/Constants';
import { HttpExceptionFilter } from '@infra/Filters';
import { PhoneNumberEntity, MessageEntity, ProviderEntity } from '@domain/Entities';
import { MessageController, HomeController, PhoneNumberController } from '@ui/REST';

import { AppModule } from './App/App.Module';

@Module({
  controllers: [HomeController, PhoneNumberController, MessageController],
  imports: [
    /** TypeORM */
    TypeOrmModule.forRoot({
      type: 'postgres',

      // host: '178.251.228.30',
      // port: 32088,
      // username: 'root',
      // password: 'jXJCBHQq5kxyH6BPv',
      // database: 'sms',
      // ssl: { rejectUnauthorized: true },

      host: '139.196.89.94',
      port: 5433,
      username: 'microld',
      password: 'pBABQlyTSJZc07CX',
      database: 'db5d1d13936c3c41f782375101573714b9common',

      entityPrefix: 'tpn_',
      entities: [PhoneNumberEntity, MessageEntity, ProviderEntity],
      migrations: [],
      synchronize: NODE_ENV !== 'production',
      logging: true,
    }),

    /** EventEmitter */
    EventEmitterModule.forRoot({
      global: true,
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
export class RootModule {}
