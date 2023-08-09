import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Reader } from '../reader/model';
@Table
export class Book extends Model {
  @Column({ type: DataType.UUID, unique: true })
  uuid: string;
  @Column({ unique: true })
  name: string;

  @Column
  isbn: string;

  @Column(DataType.BOOLEAN)
  isAvailable: boolean;

  @ForeignKey(() => Reader)
  @Column
  readerId: number;
  @BelongsTo(() => Reader)
  reader: Reader;
}
