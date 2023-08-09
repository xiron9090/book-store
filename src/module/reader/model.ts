import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Book } from '../books/model';
@Table
export class Reader extends Model {
  @Column({ type: DataType.UUID, unique: true })
  uuid: string;
  @Column({ unique: true })
  name: string;
  @HasMany(() => Book)
  books: Book[];
}
