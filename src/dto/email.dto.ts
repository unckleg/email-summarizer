import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class EmailDTO {
  @Expose()
  @ApiProperty({
    example: `
    Hi Bob,
    
    I hope this email finds you well. I wanted to see if you would be available to meet with me next Wednesday at 2 PM to discuss the project we are working on.

    Please let me know if this time works for you or if you have any availability conflicts.
  
    Best,
  `,
  })
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  awaitingResponse: boolean;
}
