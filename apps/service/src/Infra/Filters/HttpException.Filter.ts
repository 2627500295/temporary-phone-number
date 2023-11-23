import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

import { Response } from 'express';

import { ExceptionResponse, getExceptionResponse } from '../Utils/getExceptionResponse';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const httpStatus = exception.getStatus();
    const {
      statusCode = httpStatus,
      message,
      data,
    } = getExceptionResponse<ExceptionResponse<{ data: any }>>(exception);

    response.status(httpStatus).json({
      statusCode,
      message,
      data: {
        ...data,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    });
  }
}
