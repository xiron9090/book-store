/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './model';
import { Op, ValidationError } from 'sequelize';
import { CreateBookDTO } from './dto/createBook.dto';
import { PaginateDTO } from 'src/core/dto/paginate.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}
  async findAll(params: PaginateDTO) {
    const offset = (params.page - 1) * params.limit;
    try {
      const { count, rows } = await this.bookModel.findAndCountAll({
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
    return await this.bookModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(input: CreateBookDTO) {
    try {
      return await this.bookModel.create({
        ...input,
      });
    } catch (error) {
      const errors = error as ValidationError;
      return { message: errors.errors };
    }
  }
  async filterBooks(
    filter: Partial<CreateBookDTO>,
    page: number,
    limit: number,
    sortField: string,
    sortOrder: 'ASC' | 'DESC',
  ) {
    const offset = (page - 1) * limit;
    const whereClause = {};

    if (filter.uuid) {
      whereClause['uuid'] = filter.uuid;
    }

    if (filter.name) {
      whereClause['name'] = { [Op.like]: `%${filter.name}%` };
    }

    if (filter.isbn) {
      whereClause['isbn'] = { [Op.like]: `%${filter.isbn}%` };
    }

    if (filter.isAvailable !== undefined) {
      whereClause['isAvailable'] = filter.isAvailable;
    }
    try {
      const { count, rows } = await this.bookModel.findAndCountAll({
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
  async updateBook(id: string, updatedData: CreateBookDTO): Promise<Book> {
    const book = await this.bookModel.findByPk(id);

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    await book.update(updatedData);
    return book;
  }

  async delete(id: string) {
    return this.bookModel.destroy({ where: { id } });
  }
}
