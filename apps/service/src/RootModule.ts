import { Module } from '@nestjs/common';

import { AppModule } from './App/App.Module';

import { PhoneController } from '@ui/REST/Phone.Controller';
import { MessageController } from '@ui/REST/Message.Controller';
import { HomeController } from '@ui/REST/Home.Controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from '@domain/Entities/Phone.Entity';
import { MessageEntity } from '@domain/Entities/Message.Entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '178.251.228.30',
      port: 32088,
      username: 'root',
      password: 'jXJCBHQq5kxyH6BPv',
      database: 'sms',
      entityPrefix: 'tpn_',
      entities: [PhoneEntity, MessageEntity],
      migrations: [],
      synchronize: true,
      logging: true,
    }),
    AppModule,
  ],
  controllers: [HomeController, PhoneController, MessageController],
  providers: [],
  exports: [],
})
export class RootModule {}
