import { ConflictException, HttpException } from '@nestjs/common';
import { BusinessExceptionStatus } from '@infra/Helpers/BusinessExceptionStatus';

export class BusinessException extends HttpException {
  public static DUPLICATE_PHONE_NUMBER = new ConflictException(
    BusinessExceptionStatus.DUPLICATE_PHONE_NUMBER,
  );
}
