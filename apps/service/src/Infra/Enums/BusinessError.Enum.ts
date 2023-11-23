export class BusinessError {
  public static valueOf(code: number, symbol: string, message: string) {
    return new this(code, symbol, message);
  }

  public constructor(
    public readonly code: number,
    public readonly symbol: string,
    public readonly message: string,
  ) {}

  public static MISSING_PARAMETERS = this.valueOf(-1000, 'MISSING_PARAMETERS', 'Missing parameters');
}
