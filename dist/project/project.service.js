"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_repository_1 = require("./project.repository");
const user_entity_1 = require("../auth/user.entity");
let ProjectService = class ProjectService {
    constructor(projectRepo) {
        this.projectRepo = projectRepo;
    }
    async getAllProjects(filterDto) {
        return this.projectRepo.getAllProjectsFromAllUsers(filterDto);
    }
    async getProjectsByUserId(id) {
        return await this.projectRepo.getProjectsByUserId(id);
    }
    async getProjectsByLoggedInUser(filterDto, user) {
        return await this.projectRepo.getProjectsByLoggedInUser(user, filterDto);
    }
    async getProjectId(id, user) {
        return await this.projectRepo.getProjectById(id, user);
    }
    async createProject(createProjectDto, user) {
        return await this.projectRepo.createProject(createProjectDto, user);
    }
    async uploadCast(id, user, files) {
        return this.projectRepo.uploadCast(id, files, user);
    }
    async uploadFilmStructure(id, files, user) {
        return this.projectRepo.uploadFilmStructure(id, files, user);
    }
    async uploadTargetAudience(id, files, user) {
        return this.projectRepo.uploadTargetAudience(id, files, user);
    }
    async uploadTreatment(id, files, user) {
        return this.projectRepo.uploadTreatment(id, files, user);
    }
    async uploadFilmSynopsis(id, files, user) {
        return this.projectRepo.uploadFilmSynopsis(id, files, user);
    }
    async updateProjectStatus(id, user, updateData) {
        return await this.projectRepo.updateProjectStatus(id, user, updateData);
    }
    async deleteProject(id) {
        return await this.projectRepo.deleteProjectById(id);
    }
};
ProjectService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(project_repository_1.ProjectRepository)),
    __metadata("design:paramtypes", [project_repository_1.ProjectRepository])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map