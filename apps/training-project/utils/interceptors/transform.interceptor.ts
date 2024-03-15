import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest();
        // check data is array
        if (
          Array.isArray(data) &&
          'page' in request.query &&
          'pageSize' in request.query &&
          data.length === 2
        ) {
          const { page, pageSize } = request.query;
          const [rows, total] = data;
          const isLastPage = rows.length < pageSize;
          const totalItem = rows.length;
          return {
            data: {
              rows,
              total,
              totalItem,
              page: +page,
              pageSize: +pageSize,
              isLastPage,
            },
            message: 'success',
            errorCode: null,
          };
        }

        return { data, message: 'success', errorCode: null };
      }),
    );
  }
}
