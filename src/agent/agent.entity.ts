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
import { IFile } from 'src/project/file.interface';
import { User } from 'src/auth/user.entity';

@Entity()
@Unique(['email'])
export class AgentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  fullName: string;

  @Column()
  position: string;

  @Column()
  homeAddress: string;

  @Column()
  email: string;

  @Column()
  telephoneNumber: string;

  @Column()
  profilePic: IFile;

  userId: string;

  @ManyToOne(
    type => User,
    user => user.agents,
    { eager: false },
  )
  user: User;
}
