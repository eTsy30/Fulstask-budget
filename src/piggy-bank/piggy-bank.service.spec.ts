import { Test, TestingModule } from '@nestjs/testing';
import { PiggyBankService } from './piggy-bank.service';

describe('PiggyBankService', () => {
  let service: PiggyBankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PiggyBankService],
    }).compile();

    service = module.get<PiggyBankService>(PiggyBankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
