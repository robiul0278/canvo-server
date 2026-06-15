import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return API info', () => {
    const result = controller.getRoot();
    expect(result).toHaveProperty('name', 'CANVO API');
    expect(result).toHaveProperty('version', '1.0');
    expect(result).toHaveProperty('docs', '/api/docs');
    expect(result).toHaveProperty('endpoints');
  });
});
