/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoanBook } from './model';
import { ValidationError } from 'sequelize';
import { CreateLoanBookDTO } from './dto/createLoanBook.dto';
import { PaginateDTO } from 'src/core/dto/paginate.dto';
import { Book } from '../books/model';
import { Reader } from '../reader/model';

@Injectable()
export class LoanBooksService {
  constructor(
    @InjectModel(Book) private bookModel: typeof Book,
    @InjectModel(Reader) private readerModel: typeof Reader,
    @InjectModel(LoanBook) private loanBookModel: typeof LoanBook,
    

  ) {}
  async findAll(params: PaginateDTO) {
    const offset = (params.page - 1) * params.limit;
    try {
      const { count, rows } = await this.loanBookModel.findAndCountAll({
        offset,
        limit: params.limit,
        order: [[params.sortField, params.sortOrder]],
      });
      const totalPages = Math.ceil(count / params.limit);
      return {
        pagination: {
          totalRecords: count,
          totalPages,
          currentPage: +params.page,
        },
        items: rows,
      };
    } catch (error) {
      const errors = error as ValidationError;
      return { message: errors, rows: 0, count: 0 };
    }
  }

  async findOne(id: string) {
    try {
      return await this.loanBookModel.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      return { message: 'Loan Book is not found' };
    }
  }

  async create(input: CreateLoanBookDTO) {
    try {
      const book = await this.bookModel.findByPk(input.bookId);
      const reader = await this.readerModel.findByPk(input.readerId);
  
      if (!book) {
        throw new NotFoundException(`Book with ID ${input.bookId} not found`);
      }
  
      if (!reader) {
        throw new NotFoundException(`Reader with ID ${input.readerId} not found`);
      }
  
      if (!book.isAvailable) {
        throw new ConflictException(`Book with ID ${input.bookId} is not available for loan`);
      }
  
      const loanDate = new Date();
      await book.update({ isAvailable: false });
      const loan = await this.loanBookModel.create({ ...input, loanDate });
  
      return loan;
    } catch (error) {
      const errors = error as ValidationError;
      return { message: errors.errors };
    }
  }
  async filterBooks(
    filter: Partial<CreateLoanBookDTO>,
    page: number,
    limit: number,
    sortField: string,
    sortOrder: 'ASC' | 'DESC',
  ) {
    const offset = (page - 1) * limit;
    const whereClause = {};

    if (filter.bookId) {
      whereClause['bookID'] = filter.bookId;
    }
    if (filter.readerId) {
      whereClause['readerID'] = filter.readerId;
    }

    try {
      const { count, rows } = await this.loanBookModel.findAndCountAll({
        where: whereClause,
        offset,
        limit,
        order: [[sortField, sortOrder]],
      });
      const totalPages = Math.ceil(count / limit);
      return {
        pagination: {
          totalRecords: count,
          totalPages,
          currentPage: +page,
        },
        items: rows,
      };
    } catch (error) {
      return error;
    }
  }
  async updateBook(
    id: string,
    updatedData: CreateLoanBookDTO,
  ): Promise<LoanBook> {
    const loanBook = await this.loanBookModel.findByPk(id);

    if (!loanBook) {
      throw new NotFoundException(`Loan book with ID ${id} not found`);
    }

    await loanBook.update(updatedData);
    return loanBook;
  }

  async delete(id: string) {
    return this.loanBookModel.destroy({ where: { id } });
  }
}
