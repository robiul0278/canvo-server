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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const query_helper_1 = require("../../common/helpers/query.helper");
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll(query) {
        const filter = query_helper_1.QueryHelper.combine(query_helper_1.QueryHelper.buildTextSearch(['name', 'email'], query.search), query_helper_1.QueryHelper.buildMatchFilter('role', query.role), query.isActive !== undefined
            ? query_helper_1.QueryHelper.buildMatchFilter('isActive', query.isActive)
            : undefined);
        return query_helper_1.QueryHelper.paginate(this.userModel, filter, {
            page: query.page,
            limit: query.limit,
            sort: query_helper_1.QueryHelper.buildSort(query.sort, { createdAt: -1 }),
            select: '-__v',
        });
    }
    async updateRole(id, role) {
        if (!['admin', 'moderator', 'user'].includes(role)) {
            throw new common_1.BadRequestException('Invalid role');
        }
        const user = await this.userModel.findByIdAndUpdate(id, { role }, { new: true });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async updateStatus(id, isActive) {
        const user = await this.userModel.findByIdAndUpdate(id, { isActive }, { new: true });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async remove(id) {
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return { deleted: true };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map