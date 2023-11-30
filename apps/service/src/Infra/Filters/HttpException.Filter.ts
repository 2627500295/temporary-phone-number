import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

import { Response } from 'express';

export type ExceptionResponse<T = unknown> = T & {
  code?: number | `${number}`;
  symbol?: string;
  message: string;
};

export type ExceptionResponseWithData = ExceptionResponse<{ data: any }>;

export function getExceptionResponse<T extends ExceptionResponse = ExceptionResponse>(exception: HttpException): T {
  const exceptionResponse = exception.getResponse() as string | T;
  if (typeof exceptionResponse === 'string') return { message: exceptionResponse } as T;
  return exceptionResponse;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode = exception.getStatus();
    const { code = statusCode, message, data } = getExceptionResponse<ExceptionResponseWithData>(exception);

    response.status(statusCode).json({
      code,
      message,
      data,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
