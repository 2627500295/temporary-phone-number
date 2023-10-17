import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './Home.Controller';
import { HomeProvider } from '../../App/Home/Home.Provider';

describe('HomeController', () => {
  let homeController: HomeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [HomeProvider],
    }).compile();

    homeController = app.get<HomeController>(HomeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(homeController.welcome()).toBe('Hello World!');
    });
  });
});
