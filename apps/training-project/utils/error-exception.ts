import { HttpException } from '@nestjs/common';

export interface DefaultResponse {
  data?: any;
  errorCode: string;
  message: string;
  statusCode: number;
}

export function createErrorException(
  dataError: DefaultResponse,
): DefaultResponse {
  throw new HttpException(
    {
      data: dataError.data || {},
      errorCode: dataError.errorCode,
      message: dataError.message,
    },
    dataError.statusCode,
  );
}
