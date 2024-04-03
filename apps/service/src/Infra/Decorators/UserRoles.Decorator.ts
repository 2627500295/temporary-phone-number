import { SetMetadata } from '@nestjs/common';

export const __USER_ROLES__ = Symbol('__USER_ROLES__');

export function UserRoles(roles: string[]) {
  return SetMetadata(__USER_ROLES__, roles);
}
