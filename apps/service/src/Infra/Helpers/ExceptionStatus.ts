export class ExceptionStatus {
  public static valueOf(code: number, symbol: string, message: string) {
    return new this(code, symbol, message);
  }

  public constructor(
    public code: number,
    public symbol: string,
    public message: string,
  ) {}

  public getSymbol() {
    return this.symbol;
  }

  public setSymbol(symbol: string) {
    this.symbol = symbol;
    return this;
  }

  public getCode() {
    return this.code;
  }

  public setCode(code: number) {
    this.code = code;
    return this;
  }

  public getMessage() {
    return this.message;
  }

  public setMessage(message: string) {
    this.message = message;
    return this;
  }
}
