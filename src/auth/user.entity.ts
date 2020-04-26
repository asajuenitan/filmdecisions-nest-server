import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  ObjectID,
  ObjectIdColumn,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ProjectEntity } from 'src/project/project.entity';
import { type } from 'os';
import { CompanyEntity } from 'src/user/company.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  jobTitle: string;

  @Column()
  profilePicPath?: string;

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

  @Column({ default: true })
  active: boolean;

  @OneToMany(
    type => ProjectEntity,
    project => project.user,
    { eager: true },
  )
  projects: ProjectEntity[];
}
