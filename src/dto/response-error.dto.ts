import { ApiProperty } from '@nestjs/swagger';

export class ResponseErrorDto {
  @ApiProperty({
    description: `A code that provides further context with respect to the error.
    <br/><br/>
    Examples: NotFound, AlreadyExists
    `,
  })
  code!: string;

  @ApiProperty({
    description: 'Human readable error description intended for the developer for debugging purposes',
  })
  message!: string;

  @ApiProperty({
    description: 'The request path associated with the response',
  })
  path!: string;

  @ApiProperty({
    description: 'HTTP status code associated with the response',
  })
  statusCode!: number;

  @ApiProperty({
    description: 'A timestamp that represents when the error response was returned',
  })
  timestamp!: string;

  @ApiProperty({
    description: `The top-level error type that corresponds to the type of exception that originated the error
    <br/><br/>
    Examples: NotFoundException
    `,
  })
  type!: string;
}
