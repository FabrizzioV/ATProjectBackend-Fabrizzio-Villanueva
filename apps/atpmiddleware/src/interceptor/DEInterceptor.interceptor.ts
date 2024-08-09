import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
  } from '@nestjs/common'
  import { defaultIfEmpty } from 'rxjs/operators'
  
  @Injectable()
  export class DefaultIfEmptyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        console.log("hola")
        console.log(context.getArgs());
      return next.handle().pipe(defaultIfEmpty({}))
    }
  }
