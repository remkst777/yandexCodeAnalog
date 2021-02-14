"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const logger_1 = require("./middlewares/logger");
const module_1 = require("./modules/channel/module");
const module_2 = require("./modules/sockets/module");
let default_1 = class {
    configure(consumer) {
        consumer.apply(logger_1.LoggerMiddleware).forRoutes("*");
    }
};
default_1 = __decorate([
    common_1.Module({ imports: [module_1.default, module_2.default] })
], default_1);
exports.default = default_1;
//# sourceMappingURL=app.module.js.map