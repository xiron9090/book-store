/* eslint-disable prettier/prettier */
import { ReadersController } from './reader.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReaderService } from './reader.service';
import { Module } from '@nestjs/common';
import { Reader } from './model';
@Module({
  imports: [SequelizeModule.forFeature([Reader])],
  controllers: [ReadersController],
  providers: [ReaderService],
})
export class ReaderModule {}
