import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isPhoneNumber,
  IS_PHONE_NUMBER,
  buildMessage,
  ValidateBy,
} from 'class-validator';
import { CountryCode } from 'libphonenumber-js/max';

import { getIntlPhoneNumber } from '@infra/Utils';

export function IsPhoneNumber(region?: CountryCode, validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_PHONE_NUMBER,
      constraints: [region],
      validator: {
        validate(value, args): boolean {
          const phoneNumber = getIntlPhoneNumber(value);
          return isPhoneNumber(phoneNumber, args?.constraints[0]);
        },
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be a valid phone number',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

export function IsIntlPhoneNumber(region?: CountryCode, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: IS_PHONE_NUMBER,
      target: object.constructor,
      propertyName: propertyName,
      constraints: [region],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const phoneNumber = getIntlPhoneNumber(value);
          return isPhoneNumber(phoneNumber, args?.constraints[0]);
        },
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be a valid phone number',
          validationOptions,
        ),
      },
    });
  };
}
