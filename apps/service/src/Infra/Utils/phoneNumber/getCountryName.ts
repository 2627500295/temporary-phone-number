import { countries, TCountryCode } from 'countries-list';
import { path } from 'ramda';

export function getCountryName(code: TCountryCode) {
  return path([code, 'name'], countries);
}
