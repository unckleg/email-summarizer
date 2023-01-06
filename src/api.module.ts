import { Module } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

import { ExceptionFilter } from './filter/exception.filter';
import { EmailSummarizerController } from './controller/email-summarizer.controller';
import { SentimentAnalysisService } from './service/sentiment-analysis.service';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const ApiModuleMetadata = {
  exports: [SentimentAnalysisService],
  controllers: [EmailSummarizerController],
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
