import Service from './service';
export default class {
    private service;
    constructor(service: Service);
    createChannel(body: any): Promise<{
        channelId: number;
    }>;
    getChannel(req: any): Promise<any>;
}
