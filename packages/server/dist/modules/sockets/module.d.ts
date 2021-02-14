import { Server } from 'socket.io';
export declare class EventsGateway {
    server: Server;
    channels: {};
    constructor();
    joinRoom(client: any, channelId: any): void;
    leaveRoom(client: any, channelId: any): void;
    ggg: string;
    sendMessage(body: any): void;
}
export default class EventsModule {
}
