/* eslint-disable prettier/prettier */
import { BooksController } from './loanBooks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { LoanBook } from './model';
import { Book } from '../books/model';
import { Reader } from '../reader/model';
import { LoanBooksService } from './loanBooks.service';

@Module({
  imports: [SequelizeModule.forFeature([Book, Reader, LoanBook])],
  controllers: [BooksController],
  providers: [LoanBooksService],
})
export class LoanBooksModule {}
