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
exports.FrontendContentSchema = exports.FrontendContent = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FrontendContent = class FrontendContent {
    section;
    data;
    isActive;
    updatedBy;
};
exports.FrontendContent = FrontendContent;
__decorate([
    (0, mongoose_1.Prop)({
        enum: [
            'hero',
            'announcement_bar',
            'featured_section',
            'promo_banner',
            'footer',
            'social_links',
        ],
        required: true,
        unique: true,
    }),
    __metadata("design:type", String)
], FrontendContent.prototype, "section", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Mixed, required: true }),
    __metadata("design:type", Object)
], FrontendContent.prototype, "data", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], FrontendContent.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], FrontendContent.prototype, "updatedBy", void 0);
exports.FrontendContent = FrontendContent = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], FrontendContent);
exports.FrontendContentSchema = mongoose_1.SchemaFactory.createForClass(FrontendContent);
//# sourceMappingURL=frontend-content.schema.js.map