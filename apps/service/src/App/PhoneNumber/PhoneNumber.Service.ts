import { PhoneNumberEntity } from '@domain/Entities/PhoneNumber.Entity';
import { CreatePhoneInput } from '@domain/DTOs/CreatePhone.Input';
import { PhoneListVO } from '@domain/ValueObjects/PhoneList.VO';
import { ListPhonesInput } from '@domain/DTOs/ListPhones.Input';
import { CreateNumberInput } from '@domain/DTOs/PhoneNumber/CreateNumber.Input';
import { ReportOnlineDTO } from '@domain/DTOs/PhoneNumber/ReportOnline.DTO';
import { DeleteNumberDTO } from '@domain/DTOs/PhoneNumber/DeleteNumber.DTO';

export abstract class PhoneNumberService {
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
  abstract createPhone(body: CreateNumberInput): Promise<PhoneNumberEntity>;

  abstract reportOnline(body: ReportOnlineDTO): Promise<PhoneNumberEntity>;

  abstract listPhones(input: ListPhonesInput): Promise<PhoneListVO>;

  abstract deletePhone(body: DeleteNumberDTO): Promise<boolean>;
}
