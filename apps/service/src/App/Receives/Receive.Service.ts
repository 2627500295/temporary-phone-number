import { PhoneNumberEntity } from '@domain/Entities/PhoneNumber.Entity';
import { CreatePhoneInput } from '@domain/DTOs/CreatePhone.Input';
import { PhoneListVO } from '@domain/ValueObjects/PhoneList.VO';
import { ListPhonesInput } from '@domain/DTOs/ListPhones.Input';

export abstract class ReceiveService {
  /**
   * Register a phone number to receive SMS
   *
   * @param body - Register information
   *
   * @privateRemarks
   *
   * User role:
   *  System / Administrator
   *  User
   *  Guest
   *
   * ---
   *
   * @remarks
   * 111
   *
   * @public
   */
  abstract createPhone(body: CreatePhoneInput): Promise<PhoneNumberEntity>;

  abstract listPhones(input: ListPhonesInput): Promise<PhoneListVO>;
  // abstract getPhone(): Promise<ReceiveEntity>;
  // abstract updatePhone(): Promise<ReceiveEntity>;
  // abstract deletePhone(): Promise<boolean>;
}
