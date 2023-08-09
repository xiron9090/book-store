import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsISBN,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBookDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  uuid: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  readerId: string;
  @IsISBN()
  @IsNotEmpty()
  @ApiProperty()
  isbn: string;
  @IsBoolean()
  @ApiProperty()
  isAvailable: boolean;
}
export class UpdateBookDTO {
  @IsUUID()
  @ApiProperty({ required: false })
  uuid?: string;
  @IsString()
  @ApiProperty({ required: false })
  name?: string;
  @IsNotEmpty()
  @ApiProperty()
  readerId?: string;
  @IsISBN()
  @ApiProperty({ required: false })
  isbn?: string;
  @IsBoolean()
  @ApiProperty({ required: false })
  isAvailable?: boolean;
}
