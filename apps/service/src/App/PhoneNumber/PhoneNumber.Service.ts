import { PhoneNumberEntity } from '../../Domain/Entities/PhoneNumber.Entity';
import { PhoneListVO } from '../../Domain/ValueObjects/PhoneList.VO';
import { ListPhonesInput } from '../../Domain/DTOs/ListPhones.Input';
import { CreateNumberInput } from '../../Domain/DTOs/PhoneNumber/CreateNumber.Input';
import { ReportOnlineDTO } from '../../Domain/DTOs/PhoneNumber/ReportOnline.DTO';
import { DeleteNumberDTO } from '../../Domain/DTOs/PhoneNumber/DeleteNumber.DTO';

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
