import { pipe, reduce, toPairs } from 'ramda';

export function escapeStringRegexp(str: string) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  // Escape characters with special meaning either inside or outside character sets.
  // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

export function customBanner(
  text: string = '',
  replacements: Record<string, any>,
  {
    prefix = '{{',
    suffix = '}}',
  }: {
    prefix?: string;
    suffix?: string;
  } = {},
) {
  return pipe(
    toPairs,
    reduce(
      (acc, [key, value]: [string, any]) =>
        acc.replace(new RegExp(`${prefix}${escapeStringRegexp(key)}${suffix}`, 'g'), value),
      text,
    ),
  )(replacements);
}
