"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const fs = require("fs");
const channelDto = {
    whoCreatedChannel: "",
    whoJoined: [],
    whoIsOnline: [],
    content: "",
    channelId: "",
};
let Service = class Service {
    createChannel({ whoCreatedChannel }) {
        try {
            const channelId = Date.now();
            if (!whoCreatedChannel) {
                throw new common_1.HttpException("BAD_REQUEST", common_1.HttpStatus.BAD_REQUEST);
            }
            fs.writeFileSync(`src/db/sessions/${channelId}.json`, JSON.stringify(Object.assign(Object.assign({}, channelDto), { whoCreatedChannel, whoJoined: [whoCreatedChannel], channelId })));
            return { channelId };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException("INTERNAL_SERVER_ERROR", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getChannel(channelId) {
        try {
            const content = fs.readFileSync(`src/db/sessions/${channelId}.json`);
            const kek = JSON.parse(content.toString());
            return kek;
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException("INTERNAL_SERVER_ERROR", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
Service = __decorate([
    common_1.Injectable()
], Service);
exports.default = Service;
//# sourceMappingURL=service.js.map