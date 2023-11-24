import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { HttpExceptionFilter } from '@infra/Filters/HttpException.Filter';

import { PhoneNumberEntity } from '@domain/Entities/PhoneNumber.Entity';
import { MessageEntity } from '@domain/Entities/Message.Entity';

import { MessageController } from '@ui/REST/Message.Controller';
import { PhoneNumberController } from '@ui/REST/PhoneNumber.Controller';
import { HomeController } from '@ui/REST/Home.Controller';
import { ProviderEntity } from '@domain/Entities/Provider.Entity';

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
      synchronize: true,
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
  ],
  exports: [],
})
export class RootModule {}
