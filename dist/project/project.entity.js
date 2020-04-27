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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const project_status_1 = require("./project.status");
const user_entity_1 = require("../auth/user.entity");
let ProjectEntity = class ProjectEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], ProjectEntity.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "filmTitle", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "filmLogline", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "projectFiles", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], ProjectEntity.prototype, "filmSynopsis", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], ProjectEntity.prototype, "cast", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], ProjectEntity.prototype, "targetAudience", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], ProjectEntity.prototype, "treatment", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], ProjectEntity.prototype, "filmStructure", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "approvalStatus", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.projects, { eager: false }),
    __metadata("design:type", user_entity_1.User)
], ProjectEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "dateCreated", void 0);
ProjectEntity = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['filmTitle'])
], ProjectEntity);
exports.ProjectEntity = ProjectEntity;
//# sourceMappingURL=project.entity.js.map