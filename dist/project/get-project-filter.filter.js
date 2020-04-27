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
const class_validator_1 = require("class-validator");
const project_status_1 = require("./project.status");
class GetProjectFilterDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn([
        project_status_1.ProjectStatus.DEVELOPMENT,
        project_status_1.ProjectStatus.PRE_PRODUCTION,
        project_status_1.ProjectStatus.PRODUCTION,
        project_status_1.ProjectStatus.POST_PRODUCTION,
        project_status_1.ProjectStatus.FILM_FESTIVALS,
        project_status_1.ProjectStatus.MEDIA_PLAN,
        project_status_1.ProjectStatus.DISTRIBUTION,
        project_status_1.ProjectStatus.FILM_BUDGET,
    ]),
    __metadata("design:type", String)
], GetProjectFilterDto.prototype, "status", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn([
        project_status_1.ApprovalStatus.PENDING,
        project_status_1.ApprovalStatus.APPROVED,
        project_status_1.ApprovalStatus.REJECTED,
    ]),
    __metadata("design:type", String)
], GetProjectFilterDto.prototype, "approvalStatus", void 0);
exports.GetProjectFilterDto = GetProjectFilterDto;
//# sourceMappingURL=get-project-filter.filter.js.map