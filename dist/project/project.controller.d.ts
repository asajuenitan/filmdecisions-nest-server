import { ProjectService } from './project.service';
import { GetProjectFilterDto } from './get-project-filter.filter';
import { ProjectEntity } from './project.entity';
import { User } from 'src/auth/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
export declare class ProjectController {
    private projectService;
    constructor(projectService: ProjectService);
    getAllProjects(filterDto: GetProjectFilterDto): Promise<ProjectEntity[]>;
    getProjectsByLoggedInUser(filterDto: GetProjectFilterDto, user: User): Promise<ProjectEntity[]>;
    getProjectsByUserId(id: string): Promise<ProjectEntity[]>;
    getProjectById(id: string, user: User): Promise<ProjectEntity>;
    createProject(user: User, createProjectDto: CreateProjectDto): Promise<ProjectEntity>;
    UploadCast(id: string, user: User, files: any): Promise<ProjectEntity>;
    uploadFilmStructure(id: string, user: User, files: any): Promise<ProjectEntity>;
    uploadTargetAudience(id: string, user: User, files: any): Promise<ProjectEntity>;
    uploadTreatment(id: string, user: User, files: any): Promise<ProjectEntity>;
    uploadFilmSynopsis(id: string, user: User, files: any): Promise<ProjectEntity>;
    deleteProjectById(id: string): Promise<void>;
}
