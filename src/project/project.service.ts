import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { ProjectRepository } from './project.repository';
import { GetProjectFilterDto } from './get-project-filter.filter';
import { User } from 'src/auth/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { IFileObject } from './file-object.interface';

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

  async updateProjectFiles(user: User, projectId: string, files: IFileObject) {
    return await this.projectRepo.uploadProjectFilesById(
      projectId,
      files,
      user,
    );
  }

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
