import { Module } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

import { ExceptionFilter } from './filter/exception.filter';
import { SentimentAnalysisService } from './service/sentiment-analysis.service';
import { EmailSummaryController } from './controller/email-summary.controller';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const ApiModuleMetadata = {
  exports: [SentimentAnalysisService],
  controllers: [EmailSummaryController],
  providers: [
    SentimentAnalysisService,
    ExceptionFilter,
    {
      provide: OpenAIApi,
      useValue: new OpenAIApi(configuration),
    },
  ],
};

@Module(ApiModuleMetadata)
export class ApiModule {}

export const ApiTestModuleMetadata = {
  exports: ApiModuleMetadata.exports,
  controllers: ApiModuleMetadata.controllers,
  providers: [...ApiModuleMetadata.providers],
};

@Module(ApiTestModuleMetadata)
export class ApiTestModule {}
