import {
  Entity,
  Unique,
  BaseEntity,
  ObjectID,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  companyName: string;

  @Column()
  registrationNumber: string;

  @Column()
  dateOfIncorporation: string;

  @Column()
  registeredOfficeAddress: string;

  @Column()
  businessAddress: string;

  @Column()
  mailingAddress: string;

  @Column()
  taxIdentificationNumber: string;

  @Column()
  telephoneNumber: string;

  @Column()
  companyEmailAddress: string;

  @Column()
  userId: string;

  @OneToOne(
    type => User,
    user => user.companyName,
    { eager: false },
  )
  user: User;
}
