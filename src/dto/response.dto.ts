import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class SummaryAndSentimentResponseDTO {
  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  summary?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  sentiment?: 'positive' | 'negative' | 'neutral';

  @ApiProperty({ default: false })
  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  awaitingResponse: boolean;
}
