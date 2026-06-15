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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/user.schema");
let AuthService = class AuthService {
    userModel;
    configService;
    adminEmails;
    constructor(userModel, configService) {
        this.userModel = userModel;
        this.configService = configService;
        const raw = this.configService.get('ADMIN_EMAILS') || '';
        this.adminEmails = raw
            .split(',')
            .map((e) => e.trim().toLowerCase())
            .filter(Boolean);
    }
    async syncUser(dto) {
        const isAdmin = this.adminEmails.includes(dto.email.toLowerCase());
        let user = await this.userModel.findOne({ googleId: dto.googleId });
        if (user) {
            user.lastLogin = new Date();
            if (dto.avatar)
                user.avatar = dto.avatar;
            if (dto.name)
                user.name = dto.name;
            if (isAdmin)
                user.role = 'admin';
            return user.save();
        }
        const existingEmail = await this.userModel.findOne({ email: dto.email });
        if (existingEmail) {
            existingEmail.googleId = dto.googleId;
            existingEmail.lastLogin = new Date();
            if (dto.avatar)
                existingEmail.avatar = dto.avatar;
            if (isAdmin)
                existingEmail.role = 'admin';
            return existingEmail.save();
        }
        user = new this.userModel({
            googleId: dto.googleId,
            name: dto.name,
            email: dto.email,
            avatar: dto.avatar,
            role: isAdmin ? 'admin' : 'user',
            lastLogin: new Date(),
        });
        return user.save();
    }
    async getMe(userId) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async updateMe(userId, dto) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (dto.phone !== undefined)
            user.phone = dto.phone;
        if (dto.addresses !== undefined)
            user.addresses = dto.addresses;
        return user.save();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map