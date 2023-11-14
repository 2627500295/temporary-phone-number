import { Global, Module } from '@nestjs/common';

import { HomeProvider } from '@app/Home/Home.Provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumberEntity } from '@domain/Entities/PhoneNumber.Entity';
import { MessageEntity } from '@domain/Entities/Message.Entity';

// import { ReceiveProvider } from '@app/Receives/Receive.Provider';
// import { MessageProvider } from './Messages/Message.Provider';
import { PhoneNumberProvider } from '@app/PhoneNumber/PhoneNumber.Provider';

@Global()
@Module({
  // imports: [TypeOrmModule.forFeature([PhoneNumberEntity, MessageEntity])],
  controllers: [],
  providers: [
    HomeProvider,
    // PhoneNumberProvider,
    // ReceiveProvider,
    // MessageProvider,
  ],
  exports: [
    HomeProvider,
    // PhoneNumberProvider,
    // ReceiveProvider,
    // MessageProvider,
  ],
})
export class AppModule {}
