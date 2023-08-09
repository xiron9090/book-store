import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Reader } from '../reader/model';
import { Book } from '../books/model';
@Table
export class LoanBook extends Model {
  @ForeignKey(() => Book)
  @Column
  bookId: number;

  @ForeignKey(() => Reader)
  @Column
  readerId: number;

  @Column
  loanDate: Date;

  @BelongsTo(() => Book)
  book: Book;

  @BelongsTo(() => Reader)
  reader: Reader;
}
