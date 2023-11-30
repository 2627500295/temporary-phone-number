export class BusinessError {
  public static valueOf(code: number, symbol: string, message: string) {
    return new this(code, symbol, message);
  }

  public constructor(
    public readonly code: number,
    public readonly symbol: string,
    public readonly message: string,
  ) {}

  // Module Name: Universal
  // Module Code: 0

  public static MISSING_PARAMETERS = this.valueOf(-1000, 'MISSING_PARAMETERS', 'Missing parameters');

  // Module Name: Phone Number
  // Module Code: 100

  public static PHONE_NUMBER_NOT_EXIST = this.valueOf(-100001, 'PHONE_NUMBER_NOT_EXIST', 'Phone number does not exist');

  public static PHONE_NUMBER_DUPLICATE = this.valueOf(-100002, 'PHONE_NUMBER_DUPLICATE', 'Phone number duplicate');

  // Module Name: Message
  // Module Code: 110

  public static MESSAGE_MISSING_CONTENT_PARAMETERS = this.valueOf(
    -110001,
    'MESSAGE_MISSING_CONTENT_PARAMETERS',
    'Missing `content` parameters',
  );
}
