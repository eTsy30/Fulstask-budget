import { Test, TestingModule } from '@nestjs/testing';
import { PiggyBankController } from './piggy-bank.controller';
import { PiggyBankService } from './piggy-bank.service';

describe('PiggyBankController', () => {
  let controller: PiggyBankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiggyBankController],
      providers: [PiggyBankService],
    }).compile();

    controller = module.get<PiggyBankController>(PiggyBankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
