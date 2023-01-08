import { Test, TestingModule } from '@nestjs/testing';

import { plainToClass } from 'class-transformer';
import { EmailSummaryController } from './email-summary.controller';
import { SentimentAnalysisService } from '../service/sentiment-analysis.service';
import { ApiTestModuleMetadata } from '../api.module';
import { SummaryAndSentimentResponseDTO } from '../dto/response.dto';

describe('EmailSummarizerController', () => {
  let controller: EmailSummaryController;
  let service: SentimentAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ApiTestModuleMetadata).compile();
    controller = module.get<EmailSummaryController>(EmailSummaryController);
    service = module.get<SentimentAnalysisService>(SentimentAnalysisService);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('summarize', () => {
    it('should return an summary object', async () => {
      const summary = 'Bogus text with happy ending.';
      const result = plainToClass(SummaryAndSentimentResponseDTO, {
        summary,
        sentiment: 'positive',
        awaitingResponse: true,
      });
      jest.spyOn(service, 'analyze').mockResolvedValue(result);
      expect(await controller.summarize({ text: summary })).toStrictEqual(result);
    });
  });
});
