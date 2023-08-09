/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ReaderService } from './reader.service';
import { CreateReaderDTO, UpdateReaderDTO } from './dto/createReader.dto';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { Sort } from 'src/core/utils/enums';

@Controller('reader')
export class ReadersController {
  constructor(private readerService: ReaderService) {}
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sortField', required: false })
  @ApiQuery({ name: 'sortOrder', required: false })
  async getAllReaders(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sortField') sortField = 'id',
    @Query('sortOrder') sortOrder: Sort = Sort.ASC,
  ) {
    return await this.readerService.findAll({
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
  @ApiQuery({ name: 'query', required: false,type: UpdateReaderDTO })
  async searchReader(
    @Query() query: Partial<CreateReaderDTO>,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sortField') sortField = 'name',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    return await this.readerService.filter(
      query,
      page,
      limit,
      sortField,
      sortOrder,
    );
  }
  @Get(':id')
  async getReader(@Param('id') id: string) {
    return await this.readerService.findOne(id);
  }

  @Post()
  async createReader(@Body() createReaderDTO: CreateReaderDTO) {
    try {
      return await this.readerService.create(createReaderDTO);
    } catch (error) {
      return error;
    }
  }
  @Put(':id')
  @ApiBody({ type: CreateReaderDTO })
  async updateReader(
    @Body() updateReaderDTO: CreateReaderDTO,
    @Param('id') id: string,
  ) {
    try {
      return this.readerService.update(id, updateReaderDTO);
    } catch (error) {
      return error;
    }
  }
  @Delete(':id')
  async deleteReader(@Param('id') id:string){
    return this.readerService.delete(id)
  }
}
