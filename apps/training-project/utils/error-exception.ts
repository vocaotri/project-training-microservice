import { HttpException } from '@nestjs/common';

export interface DefaultResponse {
  data: any;
}

export interface ErrorException {
  data?: any;
  errorCode: string;
  message: string;
  statusCode: number;
}

export function createErrorException(
  dataError: ErrorException,
): ErrorException {
  throw new HttpException(
    {
      data: dataError.data || {},
      errorCode: dataError.errorCode,
      message: dataError.message,
    },
    dataError.statusCode,
  );
}
