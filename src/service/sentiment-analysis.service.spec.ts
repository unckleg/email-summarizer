import { OpenAIApi } from 'openai';
import { SentimentAnalysisService } from './sentiment-analysis.service';

describe('SentimentAnalysisService', () => {
  let sentimentAnalysisService: SentimentAnalysisService;
  let openai: OpenAIApi;

  beforeEach(() => {
    openai = new OpenAIApi();
    sentimentAnalysisService = new SentimentAnalysisService(openai);
  });

  describe('analyzeEmailSentiment', () => {
    it('should return a summary and sentiment of the email', async () => {
      const emailDTO = {
        text: 'This is an example email.',
        awaitingResponse: false,
      };
      const summary = 'Summary of email';
      const sentiment = 'positive';
      jest.spyOn(openai, 'createCompletion').mockResolvedValueOnce({
        data: {
          choices: [{ text: summary }],
        },
      } as any);
      jest.spyOn(openai, 'createCompletion').mockResolvedValueOnce({
        data: {
          choices: [{ text: `The sentiment of this email is ${sentiment}.` }],
        },
      } as any);

      const result = await sentimentAnalysisService.analyzeEmailSentiment(emailDTO);
      expect(result).toEqual({
        summary,
        sentiment,
        awaitingResponse: emailDTO.awaitingResponse,
      });
    });

    it('should return a neutral sentiment if no sentiment can be determined', async () => {
      const emailDTO = {
        text: 'This is an example email.',
        awaitingResponse: false,
      };
      const summary = 'Summary of email';
      jest.spyOn(openai, 'createCompletion').mockResolvedValueOnce({
        data: {
          choices: [{ text: summary }],
        },
      } as any);
      jest.spyOn(openai, 'createCompletion').mockResolvedValueOnce({
        data: {
          choices: [{ text: `I'll be neutral.` }],
        },
      } as any);

      const result = await sentimentAnalysisService.analyzeEmailSentiment(emailDTO);
      expect(result).toEqual({
        summary,
        sentiment: 'neutral',
        awaitingResponse: emailDTO.awaitingResponse,
      });
    });
  });
});
