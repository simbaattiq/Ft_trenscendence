import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.removePasswordFields(data)),
    );
  }

  private removePasswordFields(obj: any): any {
    if (!obj) return obj;

    if (Array.isArray(obj)) {
      return obj.map((item) => this.removePasswordFields(item));
    }

    if (typeof obj === 'object') {
      const { password, twoFactorSecret, ...rest } = obj;
      
      for (const key in rest) {
        if (rest[key] && typeof rest[key] === 'object') {
          rest[key] = this.removePasswordFields(rest[key]);
        }
      }
      
      return rest;
    }

    return obj;
  }
}