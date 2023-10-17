import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './Message.Controller';
import { MessageProvider } from '../../App/Messages/Message.Provider';

describe('MessageController', () => {
  let messageController: MessageController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [MessageProvider],
    }).compile();

    messageController = app.get<MessageController>(MessageController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(messageController.getHello()).toBe('Hello World!');
  //   });
  // });
});
