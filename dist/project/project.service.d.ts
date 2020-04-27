import { ProjectEntity } from './project.entity';
import { ProjectRepository } from './project.repository';
import { GetProjectFilterDto } from './get-project-filter.filter';
import { User } from 'src/auth/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { IFile } from './file.interface';
export declare class ProjectService {
    private projectRepo;
    constructor(projectRepo: ProjectRepository);
    getAllProjects(filterDto: GetProjectFilterDto): Promise<ProjectEntity[]>;
    getProjectsByUserId(id: any): Promise<ProjectEntity[]>;
    getProjectsByLoggedInUser(filterDto: GetProjectFilterDto, user: User): Promise<ProjectEntity[]>;
    getProjectId(id: string, user: User): Promise<ProjectEntity>;
    createProject(createProjectDto: CreateProjectDto, user: User): Promise<ProjectEntity>;
    uploadCast(id: string, user: User, files: IFile): Promise<ProjectEntity>;
    uploadFilmStructure(id: string, files: IFile, user: User): Promise<ProjectEntity>;
    uploadTargetAudience(id: string, files: IFile, user: User): Promise<ProjectEntity>;
    uploadTreatment(id: string, files: IFile, user: User): Promise<ProjectEntity>;
    uploadFilmSynopsis(id: string, files: IFile, user: User): Promise<ProjectEntity>;
    updateProjectStatus(id: string, user: User, updateData: any): Promise<ProjectEntity>;
    deleteProject(id: string): Promise<void>;
}
