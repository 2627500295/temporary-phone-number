export type PropsWithParams<T = unknown, P = unknown> = { params: T } & P;

export type PropsWithLocaleParams<
  T extends { locale: string } = { locale: string },
  P = unknown,
> = PropsWithParams<T, P>;
