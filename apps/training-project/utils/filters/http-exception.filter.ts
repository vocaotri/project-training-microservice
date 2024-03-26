import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.status;

    switch (status) {
      case 400:
        exception = {
          ...exception.response,
        };
        delete exception.statusCode;
        break;
    }
    response.status(status).json(exception);
  }
}
