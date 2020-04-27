import { EntityRepository, Repository, createQueryBuilder } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { User } from '../auth/user.entity';
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

  async getProjectsByUserId(id: string): Promise<ProjectEntity[]> {
    const projects = await this.find({ userId: id });
    return projects;
  }

  async getProjectsByLoggedInUser(
    user: User,
    filterDto: GetProjectFilterDto,
  ): Promise<ProjectEntity[]> {
    const { status, approvalStatus } = filterDto;
    let projects = await this.find({
      userId: user._id.toString(),
    });
    if (status) {
      projects = await this.find({
        userId: user._id.toString(),
        status: status,
      });
    }
    if (approvalStatus) {
      const projects = await this.find({
        userId: user._id.toString(),
        approvalStatus: approvalStatus,
      });
    }
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

  async deleteProjectById(id: any) {
    try {
      const project = await this.findOne(id);
      this.delete(project);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async deleteProjectByUser(id: string, user): Promise<void> {
    this.delete;
    const project = await this.findOne(id, { where: `userId = ${user._id}` });
    if (project) {
      this.deleteProjectById(project._id);
    }
  }

  async uploadCast(id: string, files: any, user: User): Promise<ProjectEntity> {
    const project = await this.findOne(id, { where: `userId = ${user._id}` });
    project.cast = files;
    // const element = files[i];
    // console.log(project);
    try {
      project.save();
      return project;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async uploadFilmStructure(
    id: string,
    files: any,
    user: User,
  ): Promise<ProjectEntity> {
    const project = await this.findOne(id, { where: `userId = ${user._id}` });
    try {
      project.filmStructure = files;
      project.save();
      return project;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async uploadTargetAudience(
    id: string,
    files: any,
    user: User,
  ): Promise<ProjectEntity> {
    const project = await this.findOne(id, { where: `userId = ${user._id}` });
    try {
      project.targetAudience = files;
      project.save();
      return project;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async uploadTreatment(
    id: string,
    files: any,
    user: User,
  ): Promise<ProjectEntity> {
    const project = await this.findOne(id, { where: `userId = ${user._id}` });
    try {
      project.treatment = files;
      project.save();
      return project;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async uploadFilmSynopsis(
    id: string,
    files: any,
    user: User,
  ): Promise<ProjectEntity> {
    const project = await this.findOne(id, { where: `userId = ${user._id}` });
    try {
      project.filmSynopsis = files;
      project.save();
      return project;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
