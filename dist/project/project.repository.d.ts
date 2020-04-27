import { Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { User } from 'src/auth/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectFilterDto } from './get-project-filter.filter';
export declare class ProjectRepository extends Repository<ProjectEntity> {
    getAllProjectsFromAllUsers(filterDto: GetProjectFilterDto): Promise<ProjectEntity[]>;
    getProjectsByUserId(id: string): Promise<ProjectEntity[]>;
    getProjectsByLoggedInUser(user: User, filterDto: GetProjectFilterDto): Promise<ProjectEntity[]>;
    getProjectById(id: string, user: User): Promise<ProjectEntity>;
    createProject(createProjectDto: CreateProjectDto, user: User): Promise<ProjectEntity>;
    updateProjectStatus(id: string, user: User, updateData: any): Promise<ProjectEntity>;
    deleteProjectById(id: any): Promise<void>;
    deleteProjectByUser(id: string, user: any): Promise<void>;
    uploadCast(id: string, files: any, user: User): Promise<ProjectEntity>;
    uploadFilmStructure(id: string, files: any, user: User): Promise<ProjectEntity>;
    uploadTargetAudience(id: string, files: any, user: User): Promise<ProjectEntity>;
    uploadTreatment(id: string, files: any, user: User): Promise<ProjectEntity>;
    uploadFilmSynopsis(id: string, files: any, user: User): Promise<ProjectEntity>;
}
