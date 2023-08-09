/* eslint-disable prettier/prettier */
import { BooksController } from './books.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BooksService } from './books.service';
import { Module } from '@nestjs/common';
import { Book } from './model';
@Module({
  imports: [SequelizeModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
