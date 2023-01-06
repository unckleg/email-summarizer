import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { ResponseErrorDto } from '../dto/response-error.dto';
import { SentimentAnalysisService } from '../service/sentiment-analysis.service';
import { EmailDTO } from '../dto/email.dto';
import { SummaryAndSentimentResponseDTO } from '../dto/response.dto';

@ApiTags(...['email-summarizer'])
@Controller('api/v1/email-summarizer')
@ApiExtraModels(ResponseErrorDto)
@Controller()
export class EmailSummarizerController {
  constructor(private readonly sentimentAnalysisService: SentimentAnalysisService) {}

  /*
   POST /summarize
  */
  @Post('/summarize')
  @ApiOperation({
    summary: 'Analyze the sentiment of the email',
    description: 'Analyze the sentiment of the email',
  })
  @ApiBody({
    type: EmailDTO,
  })
  @ApiOkResponse({
    description: 'Return the summary and sentiment to the client',
    type: SummaryAndSentimentResponseDTO,
  })
  async summarize(@Body(new ValidationPipe({ transform: true })) emailDTO: EmailDTO): Promise<SummaryAndSentimentResponseDTO> {
    const summaryAndSentimentResponse = await this.sentimentAnalysisService.analyzeEmailSentiment(emailDTO);
    return plainToClass(SummaryAndSentimentResponseDTO, summaryAndSentimentResponse);
  }
}
