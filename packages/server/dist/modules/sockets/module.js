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
exports.EventsGateway = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let EventsGateway = class EventsGateway {
    constructor() {
        this.channels = {};
        this.ggg = '';
        setInterval(() => {
            Object.keys(this.channels).forEach(channelId => {
                fs.writeFileSync(`src/db/sessions/${channelId}.json`, JSON.stringify(this.channels[channelId]));
            });
        }, 10000);
    }
    joinRoom(client, channelId) {
        client.join(channelId);
    }
    leaveRoom(client, channelId) {
        client.leave(channelId);
    }
    sendMessage(body) {
        const { channelId, message } = body;
        message.forEach(({ type, currentCursorIndex, difference }) => {
            if (type === 'ADD') {
                console.log(this.ggg);
                this.ggg =
                    this.ggg.slice(0, currentCursorIndex) +
                        difference +
                        this.ggg.slice(currentCursorIndex, this.ggg.length);
            }
            else {
                this.ggg =
                    this.ggg.slice(0, currentCursorIndex) +
                        this.ggg.slice(currentCursorIndex + difference.length, this.ggg.length);
            }
        });
        this.server.to(channelId).emit(`sentMessage`, { content: this.ggg });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "joinRoom", null);
__decorate([
    websockets_1.SubscribeMessage('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "leaveRoom", null);
__decorate([
    websockets_1.SubscribeMessage('sendMessage'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "sendMessage", null);
EventsGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [])
], EventsGateway);
exports.EventsGateway = EventsGateway;
let EventsModule = class EventsModule {
};
EventsModule = __decorate([
    common_1.Module({ providers: [EventsGateway] })
], EventsModule);
exports.default = EventsModule;
//# sourceMappingURL=module.js.map