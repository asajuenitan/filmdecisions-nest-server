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
const passport_1 = require("@nestjs/passport");
const project_service_1 = require("./project.service");
const get_project_filter_filter_1 = require("./get-project-filter.filter");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const platform_express_1 = require("@nestjs/platform-express");
const create_project_dto_1 = require("./dto/create-project.dto");
const roles_decorator_1 = require("../auth/roles.decorator");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async getAllProjects(filterDto) {
        return this.projectService.getAllProjects(filterDto);
    }
    async getProjectsByLoggedInUser(filterDto, user) {
        return this.projectService.getProjectsByLoggedInUser(filterDto, user);
    }
    async getProjectsByUserId(id) {
        return await this.projectService.getProjectsByUserId(id);
    }
    async getProjectById(id, user) {
        return await this.projectService.getProjectId(id, user);
    }
    async createProject(user, createProjectDto) {
        return await this.projectService.createProject(createProjectDto, user);
    }
    async UploadCast(id, user, files) {
        return this.projectService.uploadCast(id, user, files);
    }
    async uploadFilmStructure(id, user, files) {
        return this.projectService.uploadFilmStructure(id, files, user);
    }
    async uploadTargetAudience(id, user, files) {
        return this.projectService.uploadTargetAudience(id, files, user);
    }
    async uploadTreatment(id, user, files) {
        return this.projectService.uploadTreatment(id, files, user);
    }
    async uploadFilmSynopsis(id, user, files) {
        return this.projectService.uploadFilmSynopsis(id, files, user);
    }
    async deleteProjectById(id) {
        return await this.projectService.deleteProject(id);
    }
};
__decorate([
    common_1.Get('all'),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Query(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_project_filter_filter_1.GetProjectFilterDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAllProjects", null);
__decorate([
    common_1.Get('projects'),
    __param(0, common_1.Query(common_1.ValidationPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_project_filter_filter_1.GetProjectFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectsByLoggedInUser", null);
__decorate([
    common_1.Get('user/:id/projects'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectsByUserId", null);
__decorate([
    common_1.Get('project/:id'),
    __param(0, common_1.Param('id')),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectById", null);
__decorate([
    common_1.Post('project/create'),
    __param(0, get_user_decorator_1.GetUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createProject", null);
__decorate([
    common_1.Put('project/:id/upload-cast'),
    common_1.UseInterceptors(platform_express_1.AnyFilesInterceptor()),
    __param(0, common_1.Param('id')),
    __param(1, get_user_decorator_1.GetUser()),
    __param(2, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "UploadCast", null);
__decorate([
    common_1.Put('project/:id/upload-film-structure'),
    common_1.UseInterceptors(platform_express_1.AnyFilesInterceptor()),
    __param(0, common_1.Param('id')),
    __param(1, get_user_decorator_1.GetUser()),
    __param(2, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "uploadFilmStructure", null);
__decorate([
    common_1.Put('project/:id/upload-target-audience'),
    common_1.UseInterceptors(platform_express_1.AnyFilesInterceptor()),
    __param(0, common_1.Param('id')),
    __param(1, get_user_decorator_1.GetUser()),
    __param(2, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "uploadTargetAudience", null);
__decorate([
    common_1.Put('project/:id/upload-treatment'),
    common_1.UseInterceptors(platform_express_1.AnyFilesInterceptor()),
    __param(0, common_1.Param('id')),
    __param(1, get_user_decorator_1.GetUser()),
    __param(2, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "uploadTreatment", null);
__decorate([
    common_1.Put('project/:id/upload-film-synopsis'),
    common_1.UseInterceptors(platform_express_1.AnyFilesInterceptor()),
    __param(0, common_1.Param('id')),
    __param(1, get_user_decorator_1.GetUser()),
    __param(2, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "uploadFilmSynopsis", null);
__decorate([
    common_1.Delete('/project/:id'),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteProjectById", null);
ProjectController = __decorate([
    common_1.Controller('projects'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map