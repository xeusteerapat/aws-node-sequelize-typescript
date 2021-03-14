import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  public firstname!: string;

  @Column
  public lastname!: string;

  @Column
  public email!: string;

  @CreatedAt
  public createdAt: Date = new Date();

  @UpdatedAt
  public updatedAt: Date = new Date();
}
