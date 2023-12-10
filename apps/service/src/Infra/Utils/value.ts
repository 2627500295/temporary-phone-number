import { isNil } from 'ramda';
import { isBoolean } from 'class-validator';

export function toBoolean(value: any) {
  if (isNil(value)) return undefined;
  if (isBoolean(value)) return value;
  if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) return true;
  if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) return false;
  return undefined;
}
