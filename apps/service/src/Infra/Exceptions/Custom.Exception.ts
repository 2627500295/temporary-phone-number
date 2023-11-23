import { HttpException, HttpExceptionOptions } from '@nestjs/common';

export const CustomErrorCode = 520;

export class CustomException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions: string | HttpExceptionOptions = 'Custom Exception',
  ) {
    const { description, httpExceptionOptions } = HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
    super(HttpException.createBody(objectOrError, description, CustomErrorCode), CustomErrorCode, httpExceptionOptions);
  }
}
