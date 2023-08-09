import { ApiProperty } from '@nestjs/swagger';
import { Sort } from '../utils/enums';
import { IsOptional } from 'class-validator';

export class PaginateDTO {
  @ApiProperty()
  @IsOptional()
  page: number;
  @ApiProperty()
  @IsOptional()
  limit: number;
  @ApiProperty()
  @IsOptional()
  sortField: string;
  @ApiProperty()
  @IsOptional()
  sortOrder: Sort;
}
