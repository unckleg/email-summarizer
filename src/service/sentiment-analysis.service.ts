import { Injectable, Logger } from '@nestjs/common';
import { EmailDTO } from '../dto/email.dto';
import { SummaryAndSentimentResponseDTO } from '../dto/response.dto';
import { OpenAIApi } from 'openai';

@Injectable()
export class SentimentAnalysisService {
  constructor(private readonly openai: OpenAIApi) {}

  async analyze(emailDTO: EmailDTO): Promise<SummaryAndSentimentResponseDTO | void> {
    try {
      const [summary, sentiment, awaitingResponse] = await Promise.all([
        this.summarizeEmail(emailDTO.text),
        this.analyzeEmailSentiment(emailDTO.text),
        this.isAwaitingResponse(emailDTO.text),
      ]);

      return {
        summary,
        sentiment,
        awaitingResponse,
      };
    } catch (e) {
      Logger.error(e);
    }
  }

  private async summarizeEmail(emailText: string): Promise<string> {
    const response = await this.openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `Summarize this email: ${emailText}`,
      temperature: 0.5,
      max_tokens: 512,
    });
    return response.data.choices.shift()?.text as string;
  }

  private async isAwaitingResponse(emailText: string): Promise<boolean> {
    const awaitingResponse = await this.openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `Is this email awaiting a response: ${emailText}`,
      temperature: 0.5,
      max_tokens: 512,
    });

    const awaitingResponseChoices = awaitingResponse.data.choices?.shift();
    return !!(awaitingResponseChoices && awaitingResponseChoices.text && awaitingResponseChoices?.text.toLowerCase().includes('yes'));
  }

  private async analyzeEmailSentiment(emailText: string): Promise<'positive' | 'negative' | 'angry' | 'neutral'> {
    const sentimentResponse = await this.openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `What is the sentiment of this email: ${emailText}`,
      temperature: 0.5,
      max_tokens: 512,
    });
    const sentiment = sentimentResponse.data.choices.shift()?.text;
    const matches = sentiment
      ?.trim()
      .split(' ')
      .pop()
      ?.match(/(positive|negative|neutral)/gi) as ['positive' | 'negative' | 'neutral' | 'angry'];
    return matches?.shift() as 'positive' | 'negative' | 'neutral';
  }
}
