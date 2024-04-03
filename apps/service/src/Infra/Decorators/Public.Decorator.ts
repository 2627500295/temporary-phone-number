import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const __PUBLIC_ROUTE__ = '__PUBLIC_ROUTE__';

export const Public = Reflector.createDecorator({
  key: __PUBLIC_ROUTE__,
  transform: () => true,
});

export function isPublic(context: ExecutionContext, reflector: Reflector) {
  const value = reflector.get(Public, context.getClass()) || reflector.get(Public, context.getHandler());
  return value ?? false;
}
