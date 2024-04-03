import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { __PUBLIC_ROUTE__, isPublic } from '../Decorators/Public.Decorator';

@Injectable()
export class PublicRoutGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    request[__PUBLIC_ROUTE__] = isPublic(context, this.reflector);
    return true;
  }
}
