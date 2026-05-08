import { v4 as uuid } from "uuid";


export class Token {

  sessionId: string = ""
  expirationTime: number = 0;

  private readonly TOKEN_DURATION = 86400000

  constructor() {
    this.sessionId = uuid();
    this.expirationTime = Date.now() + this.TOKEN_DURATION;
  }


  public static isValid(token: Token): boolean {
    return token.expirationTime > Date.now();
  }

  public static fromJson(json: string): Token {
    return JSON.parse(json);
  }

  toString(): string {
    return JSON.stringify(this)
  }


}
