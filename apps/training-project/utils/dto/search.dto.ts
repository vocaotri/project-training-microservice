import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchDto {
  @IsNumberString()
  @IsNotEmpty()
  page: number;

  @IsNumberString()
  @IsNotEmpty()
  pageSize: number;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  orderBy: string;

  @IsOptional()
  @IsBoolean()
  getAll: boolean;

  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate: Date;

  take?: number;
  skip?: number;
}
