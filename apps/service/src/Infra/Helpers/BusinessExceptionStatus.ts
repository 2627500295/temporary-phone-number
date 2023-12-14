import { ExceptionStatus } from './ExceptionStatus';

export class BusinessExceptionStatus extends ExceptionStatus {
  public static DUPLICATE_PHONE_NUMBER = this.valueOf(-4000, 'DUPLICATE_PHONE_NUMBER', 'Duplicate phone number');
}
