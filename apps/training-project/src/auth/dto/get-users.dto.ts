import { PickType } from '@nestjs/mapped-types';
import { SearchDto } from 'apps/training-project/utils/dto/search.dto';

export class GetUsersDto extends PickType(SearchDto, [
  'page',
  'pageSize',
  'search',
]) {}
