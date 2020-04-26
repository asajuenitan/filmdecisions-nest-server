import { EntityRepository, Repository, createQueryBuilder } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { User } from 'src/auth/user.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectStatus, ApprovalStatus } from './project.status';
import { GetProjectFilterDto } from './get-project-filter.filter';
import { IFileObject } from './file-object.interface';

@EntityRepository(ProjectEntity)
export class ProjectRepository extends Repository<ProjectEntity> {
  // Get All Projects
  async getAllProjectsFromAllUsers(
    filterDto: GetProjectFilterDto,
  ): Promise<ProjectEntity[]> {
    const projects = await this.find(filterDto);
    try {
      return projects;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async getProjectsByLoggedInUser(
    user: User,
    filterDto: GetProjectFilterDto,
  ): Promise<ProjectEntity[]> {
    const { status, approvalStatus } = filterDto;
    const projects = await this.find({
      userId: user._id.toString(),
    });
    try {
      return projects;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async getProjectById(id: string, user: User): Promise<ProjectEntity> {
    return await this.findOne(id, { where: user });
  }

  async createProject(
    createProjectDto: CreateProjectDto,
    user: User,
  ): Promise<ProjectEntity> {
    const { filmTitle, filmLogline } = createProjectDto;
    const project = new ProjectEntity();
    project.filmTitle = filmTitle;
    project.filmLogline = filmLogline;
    project.status = ProjectStatus.DEVELOPMENT;
    project.approvalStatus = ApprovalStatus.PENDING;
    project.userId = user._id.toString();
    project.dateCreated = new Date().toDateString();
    project.user = user;
    try {
      await project.save();
      delete project.user;
      return project;
    } catch (err) {
      throw new ConflictException();
    }
  }

  async updateProjectStatus(
    id: string,
    user: User,
    updateData,
  ): Promise<ProjectEntity> {
    const { status, approvalStatus } = updateData;
    const projectExist = await this.findOneOrFail({ _id: id, user: user });
    if (projectExist) {
      if (status) {
        projectExist.status = status;
      }
      if (approvalStatus) {
        projectExist.approvalStatus = approvalStatus;
      }
    }
    try {
      await projectExist.save();
      return projectExist;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async deleteProjectById(id: string) {
    await this.findOneOrFail(id);
    return this.delete(id);
  }

  // async deleteProjectById(id: string) {
  // const query = createQueryBuilder('project_entity', );
  // }

  // async deleteProjectByUser(id: string, user): Promise<ProjectEntity> {
  // this.delete
  // const projects = await this.find(user._id);
  // if (projects) {
  // this.deleteProjectById(projects._id)
  // }
  // }

  async uploadProjectFilesById(
    id: string,
    files: IFileObject,
    user: User,
  ): Promise<ProjectEntity> {
    const {
      filmSynopsis,
      cast,
      targetAudience,
      treatment,
      filmStructure,
    } = files;
    console.log(files);
    const project = await this.findOneOrFail(id['id']);
    if (project) {
      project.cast = cast['cast'];
      project.filmSynopsis = filmSynopsis['filmSynopsis'];
      project.targetAudience = targetAudience['targetAudience'];
      project.treatment = treatment['treatment'];
      project.filmStructure = filmStructure['filmStructure'];
    } else {
      throw new NotFoundException();
    }
    try {
      project.save();
      return project;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
