import { Module } from '@nestjs/common';
import * as fs from 'fs';

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  channels = {};

  constructor() {
    setInterval(() => {
      Object.keys(this.channels).forEach(channelId => {
        fs.writeFileSync(
          `src/db/sessions/${channelId}.json`,
          JSON.stringify(this.channels[channelId]),
        );
      });
    }, 10000);
  }

  @SubscribeMessage('joinRoom')
  joinRoom(client, channelId) {
    client.join(channelId);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client, channelId) {
    client.leave(channelId);
  }

  ggg = '';

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() body) {
    const { channelId, message } = body;

    message.forEach(({ type, currentCursorIndex, difference }) => {
      if (type === 'ADD') {
        console.log(this.ggg)

        this.ggg =
          this.ggg.slice(0, currentCursorIndex) +
          difference +
          this.ggg.slice(currentCursorIndex, this.ggg.length);
      } else {
        this.ggg =
          this.ggg.slice(0, currentCursorIndex) +
          this.ggg.slice(currentCursorIndex + difference.length, this.ggg.length);
      }
    });

    // if (!this.channels[channelId]) {
    //   const fsChannel = fs.readFileSync(`src/db/sessions/${channelId}.json`);
    //   this.channels[channelId] = JSON.parse(fsChannel.toString());
    // }

    // this.channels[channelId].content = content;

    // this.server.to(channelId).emit(`sentMessage`, this.channels[channelId]);

    this.server.to(channelId).emit(`sentMessage`, { content: this.ggg });
  }
}

@Module({ providers: [EventsGateway] })
export default class EventsModule {}
