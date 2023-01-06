import { Injectable } from '@nestjs/common';
import { EmailDTO } from '../dto/email.dto';
import { SummaryAndSentimentResponseDTO } from '../dto/response.dto';
import { OpenAIApi } from 'openai';

@Injectable()
export class SentimentAnalysisService {
  constructor(private readonly openai: OpenAIApi) {}

  async analyzeEmailSentiment(emailDTO: EmailDTO): Promise<SummaryAndSentimentResponseDTO> {
    // Use OpenAI's GPT-3 to summarize the email
    const response = await this.openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `Summarize this email: ${emailDTO.text}`,
      temperature: 0.5,
      max_tokens: 512,
    });
    const summary = response.data.choices.shift()?.text;

    // Use OpenAI's GPT-3 to analyze the sentiment of the email
    const sentimentResponse = await this.openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `What is the sentiment of this email: ${emailDTO.text}`,
      temperature: 0.5,
      max_tokens: 512,
    });
    const sentiment = sentimentResponse.data.choices.shift()?.text;

    const matches = sentiment
      ?.trim()
      .split(' ')
      .pop()
      ?.match(/(positive|negative|neutral)/gi) as ['positive' | 'negative' | 'neutral'];

    return {
      summary,
      sentiment: matches?.shift(),
      awaitingResponse: emailDTO.awaitingResponse,
    };
  }
}
