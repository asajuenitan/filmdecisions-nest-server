import {
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
  ObjectID,
  Column,
  ManyToOne,
} from 'typeorm';
import { ProjectStatus, ApprovalStatus } from './project.status';
import { User } from '../auth/user.entity';
import { IFile } from './file.interface';

@Entity()
@Unique('filmTitle', ['filmTitle'])
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  filmTitle: string;

  @Column()
  filmLogline: string;

  @Column()
  projectFiles: Array<[]>;

  @Column()
  filmSynopsis: IFile;

  @Column()
  cast: IFile;

  @Column()
  targetAudience: IFile;

  @Column()
  treatment: IFile;

  @Column()
  filmStructure: IFile;

  @Column()
  status: ProjectStatus;

  @Column()
  approvalStatus: ApprovalStatus;

  @Column()
  userId: string;

  @ManyToOne(
    type => User,
    user => user.projects,
    { eager: false },
  )
  user: User;

  @Column()
  dateCreated: string;
}
