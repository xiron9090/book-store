import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateReaderDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  uuid: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
export class UpdateReaderDTO {
  @IsUUID()
  @ApiProperty({ required: false })
  uuid?: string;
  @IsString()
  @ApiProperty({ required: false })
  name?: string;
}
