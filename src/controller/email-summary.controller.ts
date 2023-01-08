import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { ResponseErrorDto } from '../dto/response-error.dto';
import { SentimentAnalysisService } from '../service/sentiment-analysis.service';
import { EmailDTO } from '../dto/email.dto';
import { SummaryAndSentimentResponseDTO } from '../dto/response.dto';

const apiTags = ['email-summarizer'];
const endpoint = 'api/v1/email-summarizer';

@ApiTags(...apiTags)
@Controller(endpoint)
@ApiExtraModels(ResponseErrorDto)
export class EmailSummaryController {
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
    const summaryAndSentimentResponse = await this.sentimentAnalysisService.analyze(emailDTO);
    return plainToClass(SummaryAndSentimentResponseDTO, summaryAndSentimentResponse);
  }
}
