import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common';

export class OkException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions: string | HttpExceptionOptions = 'Bad Request',
  ) {
    const { description, httpExceptionOptions } = HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
    super(HttpException.createBody(objectOrError, description, HttpStatus.OK), HttpStatus.OK, httpExceptionOptions);
  }
}
