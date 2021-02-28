import { Module } from '@nestjs/common';
import * as fs from 'fs';

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import ChannelService from '../channel/service';
import { SOCKET_METHODS } from '../../common/constants';

@WebSocketGateway()
export class EventsGateway extends ChannelService {
  @WebSocketServer()
  server: Server;

  channels = {};
  usersOnline = {};

  isUserOnlineHandling({ channelId, userId, value }) {
    if (this.usersOnline[channelId]) {
      this.usersOnline[channelId][userId] = value;
    } else {
      this.usersOnline[channelId] = { [userId]: value };
    }
  }

  @SubscribeMessage(SOCKET_METHODS.NEW_USER_ROOM)
  newRoomUser(client, { channelId, userId }) {
    client.join(channelId);
    this.isUserOnlineHandling({ channelId, userId, value: true });

    this.server.to(channelId).emit(SOCKET_METHODS.NEW_USER_ROOM, this.usersOnline[channelId]);
  }

  @SubscribeMessage(SOCKET_METHODS.JOIN_ROOM)
  joinRoom(client, { channelId, userId }) {
    client.join(channelId);
    this.isUserOnlineHandling({ channelId, userId, value: true });

    this.server.to(channelId).emit(SOCKET_METHODS.USERS_ONLINE, this.usersOnline[channelId]);
  }

  @SubscribeMessage(SOCKET_METHODS.LEAVE_ROOM)
  leaveRoom(client, { channelId, userId }) {
    client.leave(channelId);
    this.isUserOnlineHandling({ channelId, userId, value: false });

    this.server.to(channelId).emit(SOCKET_METHODS.USERS_ONLINE, this.usersOnline[channelId]);
  }

  @SubscribeMessage(SOCKET_METHODS.SEND_MESSAGE)
  async sendMessage(@MessageBody() body) {
    const { channelId, message, userId } = body;

    const { content } = await (this.channels[channelId] || this.getChannel({ channelId, userId }));

    fs.writeFileSync(`src/db/contents/${channelId}.json`, JSON.stringify([...content, ...message]));

    this.server.to(channelId).emit(SOCKET_METHODS.SENT_MESSAGE, message);
  }
}

@Module({ providers: [EventsGateway] })
export default class EventsModule {}
