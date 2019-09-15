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
var typeorm_1 = require("typeorm");
var Business = /** @class */ (function () {
    function Business() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", String)
    ], Business.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Business.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Business.prototype, "userId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Business.prototype, "category", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Business.prototype, "logoImageUrl", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Business.prototype, "dateCreated", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Business.prototype, "dateModified", void 0);
    Business = __decorate([
        typeorm_1.Entity()
    ], Business);
    return Business;
}());
exports.Business = Business;
//# sourceMappingURL=Business.js.map