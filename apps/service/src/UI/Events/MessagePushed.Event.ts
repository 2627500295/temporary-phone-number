export class MessagePushedEvent {
  public constructor(options: Partial<MessagePushedEvent>) {
    Object.assign(this, options);
  }

  content: string;
  phoneNumber: string;
  from: string;
  receivedAt: string;
}
