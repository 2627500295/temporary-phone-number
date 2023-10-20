import { PhoneEntity } from '@domain/Entities/Phone.Entity';
import { CreatePhoneInput } from '@domain/DTOs/CreatePhone.Input';
import { PhoneListVO } from '@domain/ValueObjects/PhoneList.VO';
import { ListPhonesInput } from '@domain/DTOs/ListPhones.Input';

export abstract class PhoneService {
  abstract createPhone(body: CreatePhoneInput): Promise<PhoneEntity>;
  abstract listPhones(input: ListPhonesInput): Promise<PhoneListVO>;
  // abstract getPhone(): Promise<PhoneEntity>;
  // abstract updatePhone(): Promise<PhoneEntity>;
  // abstract deletePhone(): Promise<boolean>;
}
