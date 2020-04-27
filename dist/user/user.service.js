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
const user_repository_1 = require("../auth/user.repository");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../auth/user.entity");
const auth_credential_dto_1 = require("../auth/dto/auth-credential.dto");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async getAllUsers() {
        return await this.userRepo.getAllUsers();
    }
    async updateCompanyProfile(user, updateData) {
        return await this.userRepo.updateCompanyDetails(user, updateData);
    }
    async ChangeUserStatus(id) {
        return await this.userRepo.ChangeUserStatus(id);
    }
    async getOneUser(id) {
        return await this.userRepo.getOneUser(id);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map