export default class Service {
    createChannel({ whoCreatedChannel }: {
        whoCreatedChannel: any;
    }): {
        channelId: number;
    };
    getChannel(channelId: any): any;
}
