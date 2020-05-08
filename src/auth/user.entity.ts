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
import { ProjectEntity } from '../project/project.entity';
import { IFile } from 'src/project/file.interface';
import { AgentEntity } from 'src/agent/agent.entity';

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
  profilePicPath?: IFile;

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

  @Column()
  roles: string;

  @Column()
  profilePic: IFile;

  @OneToMany(
    type => ProjectEntity,
    project => project.user,
    { eager: true },
  )
  projects: ProjectEntity[];

  @OneToMany(
    type => AgentEntity,
    agent => agent.user,
    { eager: true },
  )
  agents: AgentEntity[];
}
