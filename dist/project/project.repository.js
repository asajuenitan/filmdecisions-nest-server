"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./project.entity");
const user_entity_1 = require("../auth/user.entity");
const common_1 = require("@nestjs/common");
const project_status_1 = require("./project.status");
let ProjectRepository = class ProjectRepository extends typeorm_1.Repository {
    async getAllProjectsFromAllUsers(filterDto) {
        const projects = await this.find(filterDto);
        try {
            return projects;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getProjectsByUserId(id) {
        const projects = await this.find({ userId: id });
        return projects;
    }
    async getProjectsByLoggedInUser(user, filterDto) {
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
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getProjectById(id, user) {
        return await this.findOne(id, { where: user });
    }
    async createProject(createProjectDto, user) {
        const { filmTitle, filmLogline } = createProjectDto;
        const project = new project_entity_1.ProjectEntity();
        project.filmTitle = filmTitle;
        project.filmLogline = filmLogline;
        project.status = project_status_1.ProjectStatus.DEVELOPMENT;
        project.approvalStatus = project_status_1.ApprovalStatus.PENDING;
        project.userId = user._id.toString();
        project.dateCreated = new Date().toDateString();
        project.user = user;
        try {
            await project.save();
            delete project.user;
            return project;
        }
        catch (err) {
            throw new common_1.ConflictException();
        }
    }
    async updateProjectStatus(id, user, updateData) {
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
        }
        catch (err) {
            throw new common_1.NotFoundException();
        }
    }
    async deleteProjectById(id) {
        try {
            const project = await this.findOne(id);
            this.delete(project);
        }
        catch (err) {
            throw new common_1.NotFoundException();
        }
    }
    async deleteProjectByUser(id, user) {
        this.delete;
        const project = await this.findOne(id, { where: `userId = ${user._id}` });
        if (project) {
            this.deleteProjectById(project._id);
        }
    }
    async uploadCast(id, files, user) {
        const project = await this.findOne(id, { where: `userId = ${user._id}` });
        project.cast = files;
        try {
            project.save();
            return project;
        }
        catch (err) {
            throw new common_1.NotFoundException();
        }
    }
    async uploadFilmStructure(id, files, user) {
        const project = await this.findOne(id, { where: `userId = ${user._id}` });
        try {
            project.filmStructure = files;
            project.save();
            return project;
        }
        catch (err) {
            throw new common_1.NotFoundException();
        }
    }
    async uploadTargetAudience(id, files, user) {
        const project = await this.findOne(id, { where: `userId = ${user._id}` });
        try {
            project.targetAudience = files;
            project.save();
            return project;
        }
        catch (err) {
            throw new common_1.NotFoundException();
        }
    }
    async uploadTreatment(id, files, user) {
        const project = await this.findOne(id, { where: `userId = ${user._id}` });
        try {
            project.treatment = files;
            project.save();
            return project;
        }
        catch (err) {
            throw new common_1.NotFoundException();
        }
    }
    async uploadFilmSynopsis(id, files, user) {
        const project = await this.findOne(id, { where: `userId = ${user._id}` });
        try {
            project.filmSynopsis = files;
            project.save();
            return project;
        }
        catch (err) {
            throw new common_1.NotFoundException();
        }
    }
};
ProjectRepository = __decorate([
    typeorm_1.EntityRepository(project_entity_1.ProjectEntity)
], ProjectRepository);
exports.ProjectRepository = ProjectRepository;
//# sourceMappingURL=project.repository.js.map