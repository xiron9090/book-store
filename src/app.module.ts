import { BooksModule } from './module/books/books.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReaderModule } from './module/reader/reader.module';
import { LoanBooksModule } from './module/loanBook/loanBooks.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'identity',
      password: 'Identity*2022',
      database: 'books',
      autoLoadModels: true,
      synchronize: true,
    }),
    BooksModule,
    ReaderModule,
    LoanBooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
