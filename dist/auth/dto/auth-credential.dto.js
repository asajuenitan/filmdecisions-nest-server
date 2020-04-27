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
const company_entity_1 = require("../../user/company.entity");
const company_dto_1 = require("../../user/company.dto");
class AuthCredentialDto {
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], AuthCredentialDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], AuthCredentialDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], AuthCredentialDto.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], AuthCredentialDto.prototype, "jobTitle", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AuthCredentialDto.prototype, "companyName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], AuthCredentialDto.prototype, "phone", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AuthCredentialDto.prototype, "registrationNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AuthCredentialDto.prototype, "dateOfIncorporation", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AuthCredentialDto.prototype, "registeredOfficeAddress", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AuthCredentialDto.prototype, "businessAddress", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AuthCredentialDto.prototype, "mailingAddress", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AuthCredentialDto.prototype, "taxIdentificationNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AuthCredentialDto.prototype, "telephoneNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AuthCredentialDto.prototype, "companyEmailAddress", void 0);
exports.AuthCredentialDto = AuthCredentialDto;
//# sourceMappingURL=auth-credential.dto.js.map