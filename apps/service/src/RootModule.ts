import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PhoneNumberController } from '@ui/REST/PhoneNumber.Controller';
import { HomeController } from '@ui/REST/Home.Controller';

import { PhoneNumberEntity } from '@domain/Entities/PhoneNumber.Entity';
import { MessageEntity } from '@domain/Entities/Message.Entity';

import { AppModule } from './App/App.Module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   // host: '178.251.228.30',
    //   // port: 32088,
    //   // username: 'root',
    //   // password: 'jXJCBHQq5kxyH6BPv',
    //   // database: 'sms',
    //   host: '139.196.89.94',
    //   port: 5433,
    //   username: 'microld',
    //   password: 'pBABQlyTSJZc07CX',
    //   database: 'db5d1d13936c3c41f782375101573714b9common',
    //   // ssl: { rejectUnauthorized: true },
    //   entityPrefix: 'tpn_',
    //   entities: [PhoneNumberEntity, MessageEntity],
    //   migrations: [],
    //   synchronize: true,
    //   logging: true,
    // }),
    AppModule,
  ],
  controllers: [
    HomeController,
    // PhoneNumberController,
    // MessageController
  ],
  providers: [],
  exports: [],
})
export class RootModule {}
