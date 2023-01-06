import { ArgumentsHost, BadRequestException, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ExceptionFilter } from './exception.filter';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiTestModuleMetadata } from '../api.module';

describe('ExceptionFilter', () => {
  let exceptionFilter: ExceptionFilter;
  let host: ArgumentsHost;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ApiTestModuleMetadata).compile();
    exceptionFilter = module.get<ExceptionFilter>(ExceptionFilter);
    host = {
      switchToHttp: jest.fn(() => ({
        getResponse: jest.fn(() => ({
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        })),
        getRequest: jest.fn(() => ({
          path: '/path',
        })),
      })),
    } as unknown as ArgumentsHost;
  });

  it('should be defined', () => {
    expect(exceptionFilter).toBeDefined();
  });

  /*it('should handle any exception', () => {
    const exception = new Error('error message');
    exceptionFilter.catch(exception, host);
    const response = (host.switchToHttp().getResponse as jest.Mock).mock.results[0].value as unknown as Response;
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      code: undefined,
      message: 'error message',
      path: '/path',
      statusCode: 500,
      timestamp: expect.any(String),
      type: 'Error',
    });
  });

  it('should handle HttpException', () => {
    const exception = new HttpException('error message', 400);
    exceptionFilter.catch(exception, host);
    const response = (host.switchToHttp().getResponse as jest.Mock).mock.results[0].value as Response;
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      code: undefined,
      message: 'error message',
      path: '/path',
      statusCode: 400,
      timestamp: expect.any(String),
      type: 'HttpException',
    });
  });

  it('should handle BadRequestException with class-validator error message', () => {
    const exception = new BadRequestException({
      statusCode: 400,
      error: 'BadRequest',
      message: ['error message'],
    });
    exceptionFilter.catch(exception, host);
    const response = (host.switchToHttp().getResponse as jest.Mock).mock.results[0].value as Response;
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      code: undefined,
      message: 'error message',
      path: '/path',
      statusCode: 400,
      timestamp: expect.any(String),
      type: 'BadRequestException',
    });
  });

  it('should handle BadRequestException with default error message', () => {
    const exception = new BadRequestException('error message');
    exceptionFilter.catch(exception, host);
    const response = (host.switchToHttp().getResponse as jest.Mock).mock.results[0].value as Response;
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      code: undefined,
      message: 'error message',
      path: '/path',
      statusCode: 400,
      timestamp: expect.any(String),
      type: 'BadRequestException',
    });
  });*/
});
