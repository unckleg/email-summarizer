import { Test, TestingModule } from '@nestjs/testing';

import { plainToClass } from 'class-transformer';
import { EmailSummarizerController } from './email-summarizer.controller';
import { SentimentAnalysisService } from '../service/sentiment-analysis.service';
import { ApiTestModuleMetadata } from '../api.module';
import { SummaryAndSentimentResponseDTO } from '../dto/response.dto';

describe('EmailSummarizerController', () => {
  let controller: EmailSummarizerController;
  let service: SentimentAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ApiTestModuleMetadata).compile();
    controller = module.get<EmailSummarizerController>(EmailSummarizerController);
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
      jest.spyOn(service, 'analyzeEmailSentiment').mockResolvedValue(result);
      expect(await controller.summarize({ text: summary, awaitingResponse: true })).toStrictEqual(result);
    });
  });
});
