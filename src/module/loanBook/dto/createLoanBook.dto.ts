import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsISBN,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateLoanBookDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  bookId: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readerId: string;
}
export class UpdateLoanBookDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  bookId: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readerId: string;
}
