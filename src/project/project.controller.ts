import {
  Controller,
  UseGuards,
  Query,
  ValidationPipe,
  Get,
  Post,
  UsePipes,
  UseInterceptors,
  UploadedFiles,
  Body,
  Put,
  Param,
  Req,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectService } from './project.service';
import { GetProjectFilterDto } from './get-project-filter.filter';
import { ProjectEntity } from './project.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
  AnyFilesInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { fileFilter, editFileName } from './file-upload.filter';
import { CreateProjectDto } from './dto/create-project.dto';
import { IFileObject } from './file-object.interface';
import * as multer from 'multer';
import { IFile } from './file.interface';

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('all')
  async getAllProjects(
    @Query(ValidationPipe) filterDto: GetProjectFilterDto,
  ): Promise<ProjectEntity[]> {
    return this.projectService.getAllProjects(filterDto);
  }

  @Get('projects')
  async getProjectsByLoggedInUser(
    @Query(ValidationPipe) filterDto: GetProjectFilterDto,
    @GetUser() user: User,
  ): Promise<ProjectEntity[]> {
    return this.projectService.getProjectsByLoggedInUser(filterDto, user);
  }

  @Get('project/:id')
  async getProjectById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<ProjectEntity> {
    return await this.projectService.getProjectId(id, user);
  }

  @Post('project/create')
  async createProject(
    @GetUser() user: User,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return await this.projectService.createProject(createProjectDto, user);
  }

  @Put('project/:id/upload')
  // @UseInterceptors(FileInterceptor('projectFile'))
  async UploadProjectFiles(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() file: string,
    // @UploadedFile() file,
  ) {
    console.log(file);
  }

  @Delete('/project/:id')
  async deleteProjectById(@Param('id') id: string) {
    return await this.projectService.deleteProject(id);
  }
}
