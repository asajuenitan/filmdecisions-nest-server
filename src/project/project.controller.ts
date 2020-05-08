import {
  Controller,
  UseGuards,
  Query,
  ValidationPipe,
  Get,
  Post,
  UseInterceptors,
  Body,
  Put,
  Param,
  UploadedFile,
  Delete,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectService } from './project.service';
import { GetProjectFilterDto } from './get-project-filter.filter';
import { ProjectEntity } from './project.entity';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CreateProjectDto } from './dto/create-project.dto';
import { Roles } from '../auth/roles.decorator';

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('all')
  @Roles('admin')
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

  @Get('user/:id/projects')
  async getProjectsByUserId(@Param('id') id: string): Promise<ProjectEntity[]> {
    return await this.projectService.getProjectsByUserId(id);
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

  @Put('project/:id')
  @UseInterceptors(AnyFilesInterceptor({ dest: 'uploads/projects' }))
  async uploadNewProjectFiles(
    @UploadedFiles() files,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    return await this.projectService.uploadProjectFiles(user, id, files);
  }

  // @Put('project/:id/upload-cast')
  // @UseInterceptors(
  //   FileInterceptor('cast', {
  //     dest: 'uploads/projects',
  //   }),
  // )
  // async UploadCast(
  //   @Param('id') id: string,
  //   @GetUser() user: User,
  //   @UploadedFile() file,
  // ) {
  //   console.log(file);
  //   return this.projectService.uploadCast(id, user, file);
  // }

  // @Put('project/:id/upload-film-structure')
  // @UseInterceptors(AnyFilesInterceptor())
  // async uploadFilmStructure(
  //   @Param('id') id: string,
  //   @GetUser() user: User,
  //   @UploadedFile() file,
  // ) {
  //   return this.projectService.uploadFilmStructure(id, file, user);
  // }

  // @Put('project/:id/upload-target-audience')
  // @UseInterceptors(AnyFilesInterceptor())
  // async uploadTargetAudience(
  //   @Param('id') id: string,
  //   @GetUser() user: User,
  //   @UploadedFile() file,
  // ) {
  //   return this.projectService.uploadTargetAudience(id, file, user);
  // }

  // @Put('project/:id/upload-treatment')
  // @UseInterceptors(AnyFilesInterceptor())
  // async uploadTreatment(
  //   @Param('id') id: string,
  //   @GetUser() user: User,
  //   @UploadedFile() file,
  // ) {
  //   return this.projectService.uploadTreatment(id, file, user);
  // }

  // @Put('project/:id/upload-film-synopsis')
  // @UseInterceptors(AnyFilesInterceptor())
  // async uploadFilmSynopsis(
  //   @Param('id') id: string,
  //   @GetUser() user: User,
  //   @UploadedFile() file,
  // ) {
  //   return this.projectService.uploadFilmSynopsis(id, file, user);
  // }

  @Delete('/project/:id')
  @Roles('admin')
  async deleteProjectById(@Param('id') id: string) {
    return await this.projectService.deleteProject(id);
  }

  @Get(':imgpath')
  async downloadFile(@Param('imgpath') imgPath: string, @Res() res) {
    res.sendFile(imgPath, { root: 'uploads/projects' });
  }
}
