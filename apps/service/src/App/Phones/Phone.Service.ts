import { PhoneEntity } from '@domain/Entities/Phone.Entity';
import { CreatePhoneInput } from '@domain/DTOs/CreatePhone.Input';

export abstract class PhoneService {
  abstract createPhone(body: CreatePhoneInput): Promise<PhoneEntity>;
  // abstract listPhones(): Promise<PhoneEntity[]>;
  // abstract getPhone(): Promise<PhoneEntity>;
  // abstract updatePhone(): Promise<PhoneEntity>;
  // abstract deletePhone(): Promise<boolean>;
}
