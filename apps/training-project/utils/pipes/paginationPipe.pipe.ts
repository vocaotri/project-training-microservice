import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    const page = parseInt(value.page, 10) || 1;
    const pageSize = parseInt(value.pageSize, 10) || 10;

    const take = pageSize;
    const skip = (page - 1) * pageSize;

    return {
      ...value,
      take,
      skip,
    };
  }
}
