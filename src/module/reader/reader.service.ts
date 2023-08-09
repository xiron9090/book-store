/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reader } from './model';
import { Op, ValidationError } from 'sequelize';
import { CreateReaderDTO } from './dto/createReader.dto';
import { PaginateDTO } from 'src/core/dto/paginate.dto';

@Injectable()
export class ReaderService {
  constructor(
    @InjectModel(Reader)
    private readerModel: typeof Reader,
  ) {}
  async onApplicationBootstrap() {
    const existingReaders = await this.readerModel.count();

    if (existingReaders === 0) {
      await this.readerModel.bulkCreate([
        { name: 'Lector 1',uuid:'cf0202c9-6bd5-4553-a44a-13e51f9078e7' },
        { name: 'Lector 2',uuid:'cf0202c9-6bd5-4553-a44a-13e51f9078e8' },
      ]);
    }
  }
  async findAll(params: PaginateDTO) {
    const offset = (params.page - 1) * params.limit;
    try {
      const { count, rows } = await this.readerModel.findAndCountAll({
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
      return await this.readerModel.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      return { message: 'Reader is not found' };
    }
  }

  async create(input: CreateReaderDTO) {
    try {
      return await this.readerModel.create({
        ...input,
      });
    } catch (error) {
      const errors = error as ValidationError;
      return { message: errors.errors };
    }
  }
  async filter(
    filter: Partial<CreateReaderDTO>,
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

    try {
      const { count, rows } = await this.readerModel.findAndCountAll({
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
  async update(id: string, updatedData: CreateReaderDTO): Promise<Reader> {
    const reader = await this.readerModel.findByPk(id);

    if (!reader) {
      throw new NotFoundException(`Reader with ID ${id} not found`);
    }

    await reader.update(updatedData);
    return reader;
  }

  async delete(id: string) {
    return this.readerModel.destroy({ where: { id } });
  }
}
