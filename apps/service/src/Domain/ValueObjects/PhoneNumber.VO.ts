import { Exclude, Expose, plainToInstance, Type } from 'class-transformer';

export class PhoneNumberVO {
  @Expose()
  public id: number;

  @Expose({ name: 'created_at' })
  public createdAt: string;

  @Expose({ name: 'phone_number' })
  public phoneNumber: string;

  @Expose({ name: 'country_code' })
  public countryCode: number;

  @Expose()
  public operator: number;

  @Expose()
  public description: string;

  @Expose({ name: 'reported_at' })
  public reportedAt: string;

  @Expose({ name: 'received_at' })
  public receivedAt: string | null = null;

  @Type(() => Number)
  @Expose({ name: 'sms_count' })
  public smsCount: number = 0;
}
