import { HttpException } from '@nestjs/common';

export function isString(params: any): params is string {
  return typeof params === 'string';
}

export type ExceptionResponse<T = unknown> = T & {
  statusCode?: number | `${number}`;
  message: string;
};

export function getExceptionResponse<T extends ExceptionResponse = ExceptionResponse>(exception: HttpException): T {
  const exceptionResponse = exception.getResponse() as string | T;
  if (isString(exceptionResponse)) return { message: exceptionResponse } as T;
  return exceptionResponse;
}
