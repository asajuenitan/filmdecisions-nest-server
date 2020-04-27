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
const user_repository_1 = require("./user.repository");
const mailer = require("nodemailer");
const config_1 = require("../config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepo, jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('AuthService');
    }
    async signUp(authCredentialDto) {
        const password = await this.userRepo.signUp(authCredentialDto);
        const sent = await this.sendWelcomeMail(authCredentialDto.email, password);
        if (sent !== true) {
            throw new common_1.HttpException('User not Registered', common_1.HttpStatus.CONFLICT);
        }
        else {
            return sent;
        }
    }
    async signIn(loginDto) {
        const user = await this.userRepo.validateUser(loginDto);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        else {
            const payload = { email: user.email };
            const accesstoken = await this.jwtService.sign(payload);
            this.logger.debug(`Generate JWT Token with payload ${JSON.stringify(payload)}`);
            return { accesstoken, user };
        }
    }
    async sendWelcomeMail(email, password) {
        const transporter = mailer.createTransport({
            host: config_1.default.mail.host,
            port: config_1.default.mail.port,
            secure: config_1.default.mail.secure,
            auth: {
                user: config_1.default.mail.user,
                pass: config_1.default.mail.pass,
            },
            tls: {
                rejectUnathorized: false,
            },
        });
        const mailToSend = {
            from: '"Company" <info@filmdecisions.com>',
            to: email,
            subject: 'Successful Registration',
            text: 'Successful Registration',
            html: 'Hi! <br><br> Thanks for you registration<br><br>' +
                'Your login details: <br>' +
                '<em><strong>Email: </strong>' +
                email +
                '</em><br>' +
                '<em><strong>Password: </strong>' +
                password +
                '</em><br>' +
                '<a href=' +
                config_1.default.host.url +
                ':' +
                config_1.default.host.port +
                '/login>Click here to login</a>',
        };
        const sent = await new Promise(async (resolve, reject) => {
            return await transporter.sendMail(mailToSend, async (err, info) => {
                if (err) {
                    this.logger.error('Message not sent: %s', err);
                    return reject(false);
                }
                else {
                    this.logger.debug('Message Sent: %s', info);
                    return resolve(true);
                }
            });
        });
        return sent;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map