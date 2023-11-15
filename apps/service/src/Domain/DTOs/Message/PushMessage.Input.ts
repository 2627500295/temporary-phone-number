export class PushMessageInput {
  /** 手机号码 */
  phoneNumber: string;

  /** 来源 */
  from: string;

  /** 内容 */
  content: string;

  /** 收取时间 */
  receivedAt?: string;
}
