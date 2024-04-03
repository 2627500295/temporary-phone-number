import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { __PUBLIC_ROUTE__ } from '../Decorators/Public.Decorator';

@Injectable()
export class PublicInterceptor implements NestInterceptor {
  public constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    console.log('PublicInterceptor request.__PUBLIC__', request[__PUBLIC_ROUTE__]);
    return next.handle();
  }
}
