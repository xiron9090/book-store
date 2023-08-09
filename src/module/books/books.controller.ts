/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO, UpdateBookDTO } from './dto/createBook.dto';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { Sort } from 'src/core/utils/enums';

@Controller('book')
export class BooksController {
  constructor(private bookService: BooksService) {}
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sortField', required: false })
  @ApiQuery({ name: 'sortOrder', required: false })
  async getAllBooks(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sortField') sortField = 'id',
    @Query('sortOrder') sortOrder: Sort = Sort.ASC,
  ) {
    return await this.bookService.findAll({
      page,
      limit,
      sortField,
      sortOrder,
    });
  }
  @Get('search')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sortField', required: false })
  @ApiQuery({ name: 'sortOrder', required: false })
  @ApiQuery({ name: 'query', required: false,type: UpdateBookDTO })
  async searchBook(
    @Query() query: Partial<CreateBookDTO>,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sortField') sortField = 'name',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    return await this.bookService.filterBooks(
      query,
      page,
      limit,
      sortField,
      sortOrder,
    );
  }
  @Get(':id')
  async getBook(@Param('id') id: string) {
    return await this.bookService.findOne(id);
  }

  @Post()
  async createBook(@Body() createBookDTO: CreateBookDTO) {
    try {
      return await this.bookService.create(createBookDTO);
    } catch (error) {
      return error;
    }
  }
  @Put(':id')
  @ApiBody({ type: CreateBookDTO })
  async updateBook(
    @Body() updateBookDTO: CreateBookDTO,
    @Param('id') id: string,
  ) {
    try {
      return this.bookService.updateBook(id, updateBookDTO);
    } catch (error) {
      return error;
    }
  }
  @Delete(':id')
  async deleteBook(@Param('id') id:string){
    return this.bookService.delete(id)
  }
}
