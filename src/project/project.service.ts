import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { ProjectRepository } from './project.repository';
import { GetProjectFilterDto } from './get-project-filter.filter';
import { User } from '../auth/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { IFileObject } from './file-object.interface';
import { IFile } from './file.interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository) private projectRepo: ProjectRepository,
  ) {}

  async getAllProjects(
    filterDto: GetProjectFilterDto,
  ): Promise<ProjectEntity[]> {
    return this.projectRepo.getAllProjectsFromAllUsers(filterDto);
  }

  async getProjectsByUserId(id: any): Promise<ProjectEntity[]> {
    return await this.projectRepo.getProjectsByUserId(id);
  }

  async getProjectsByLoggedInUser(
    filterDto: GetProjectFilterDto,
    user: User,
  ): Promise<ProjectEntity[]> {
    return await this.projectRepo.getProjectsByLoggedInUser(user, filterDto);
  }

  async getProjectId(id: string, user: User): Promise<ProjectEntity> {
    return await this.projectRepo.getProjectById(id, user);
  }

  async createProject(
    createProjectDto: CreateProjectDto,
    user: User,
  ): Promise<ProjectEntity> {
    return await this.projectRepo.createProject(createProjectDto, user);
  }

  async uploadProjectFiles(user: User, projectId: string, files: any) {
    return await this.projectRepo.uploadProjectFiles(projectId, user, files);
  }

  // async uploadCast(id: string, user: User, files: IFile) {
  //   return this.projectRepo.uploadCast(id, files, user);
  // }

  // async uploadFilmStructure(id: string, files: IFile, user: User) {
  //   return this.projectRepo.uploadFilmStructure(id, files, user);
  // }

  // async uploadTargetAudience(id: string, files: IFile, user: User) {
  //   return this.projectRepo.uploadTargetAudience(id, files, user);
  // }

  // async uploadTreatment(id: string, files: IFile, user: User) {
  //   return this.projectRepo.uploadTreatment(id, files, user);
  // }

  // async uploadFilmSynopsis(id: string, files: IFile, user: User) {
  //   return this.projectRepo.uploadFilmSynopsis(id, files, user);
  // }

  async updateProjectStatus(id: string, user: User, updateData) {
    return await this.projectRepo.updateProjectStatus(id, user, updateData);
  }

  async deleteProject(id: string) {
    return await this.projectRepo.deleteProjectById(id);
  }

  // async editFileName(originalname: string, filename) => {
  // const name = file.originalname.split('.')[0];
  // };

  // async fileUpload()
}
