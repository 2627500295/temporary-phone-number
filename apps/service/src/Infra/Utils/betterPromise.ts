export function betterPromise<T>(funcOrPromise: T | Promise<T>): Promise<[T, undefined] | [undefined, Error]>;

export function betterPromise<T, P extends any[]>(
  funcOrPromise: (...params: P) => T | Promise<T>,
  ...params: P
): Promise<[T, undefined] | [undefined, Error]>;

export async function betterPromise<T, P extends any[]>(
  fn: any,
  ...params: P
): Promise<[T, undefined] | [undefined, Error]> {
  try {
    const promised: T | Promise<T> = typeof fn === 'function' ? fn(...params) : fn;
    const data = await promised;
    return [data, undefined];
  } catch (error) {
    return [undefined, error];
  }
}
