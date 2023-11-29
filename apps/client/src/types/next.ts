export type PropsWithParams<T = unknown, P = unknown> = { params: T } & P;

export interface LocaleParams {
  locale?: string;
}

export type PropsWithLocaleParams<
  T extends LocaleParams = LocaleParams,
  P = unknown,
> = PropsWithParams<T, P>;
