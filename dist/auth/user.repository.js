"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const genPass = require("generate-password");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const company_dto_1 = require("../user/company.dto");
const company_entity_1 = require("../user/company.entity");
const SALT = 10;
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.newPassword = genPass.generate({
            excludeSimilarCharacters: true,
            length: 12,
            lowercase: true,
            uppercase: true,
            numbers: true,
        });
    }
    async signUp(authCredentialDto) {
        const { email, firstName, lastName, jobTitle, companyName, phone, } = authCredentialDto;
        const user = new user_entity_1.User();
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.companyName = companyName;
        user.phone = phone;
        user.jobTitle = jobTitle;
        user.roles = 'user';
        user.salt = bcrypt.genSaltSync(SALT);
        user.active = true;
        user.password = await this.hashPassword(this.newPassword, user.salt);
        try {
            const userExists = await this.findOne({ email: email });
            if (!userExists) {
                this.save(user);
                return this.newPassword;
            }
            else {
                throw new common_1.ConflictException();
            }
        }
        catch (err) {
            throw new common_1.ConflictException();
        }
    }
    async validateUser(loginDto) {
        const { email, password } = loginDto;
        try {
            const user = await this.findOne({ email });
            const isPasswordValid = await bcrypt.compareSync(password, user.password);
            if (user && isPasswordValid) {
                delete user.password;
                return user;
            }
            else {
                throw new common_1.UnauthorizedException('Invalid Credentials');
            }
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid Credentials');
        }
    }
    hashPassword(password, salt) {
        return bcrypt.hashSync(password, salt);
    }
    comparePassword(password, passwordFromDB) {
        return bcrypt.compareSync(password, passwordFromDB);
    }
    async updateCompanyDetails(user, companyDetails) {
        const { companyName, mailingAddress, telephoneNumber, businessAddress, registrationNumber, dateOfIncorporation, companyEmailAddress, registeredOfficeAddress, taxIdentificationNumber, } = companyDetails;
        const userExists = await this.findOne(user._id);
        if (userExists) {
            userExists.companyName = companyName;
            userExists.registrationNumber = registrationNumber;
            userExists.dateOfIncorporation = dateOfIncorporation;
            userExists.registeredOfficeAddress = registeredOfficeAddress;
            userExists.businessAddress = businessAddress;
            userExists.mailingAddress = mailingAddress;
            userExists.taxIdentificationNumber = taxIdentificationNumber;
            userExists.telephoneNumber = telephoneNumber;
            userExists.companyEmailAddress = companyEmailAddress;
        }
        try {
            userExists.save();
            return userExists;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    async ChangeUserStatus(id) {
        try {
            const user = await this.findOne(id);
            if (user.active) {
                user.active = false;
                user.save();
                return user;
            }
            else {
                user.active = true;
                user.save();
                return user;
            }
        }
        catch (err) {
            throw new common_1.NotFoundException();
        }
    }
    async getAllUsers() {
        try {
            return await this.find();
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getOneUser(id) {
        try {
            const user = await this.findOneOrFail(id);
            return user;
        }
        catch (err) {
            throw new common_1.NotFoundException();
        }
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map