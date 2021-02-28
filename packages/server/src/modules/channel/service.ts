import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';

import UserService from '../users/service';
import { USER_ROLES } from '../../common/constants';

@Injectable()
export default class Service {
  async createChannel({ userName, channelName }) {
    try {
      const NewUserService = new UserService();

      const channelId = Date.now();

      if (!userName || !channelName) {
        throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
      }

      const { userId } = await NewUserService.saveUser({ role: USER_ROLES.ADMIN, userName });

      fs.writeFileSync(
        `src/db/channels/${channelId}.json`,
        JSON.stringify({
          userId,
          whoJoined: [userId],
          channelId,
          channelName,
        }),
      );

      fs.writeFileSync(`src/db/contents/${channelId}.json`, JSON.stringify([]));

      return { channelId, userId };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addUserToChannel({ channelId, userId }) {
    try {
      const channel = fs.readFileSync(`src/db/channels/${channelId}.json`);
      const parsedChannel = JSON.parse(channel.toString());

      fs.writeFileSync(
        `src/db/channels/${channelId}.json`,
        JSON.stringify({ ...parsedChannel, whoJoined: [...parsedChannel.whoJoined, userId] }),
      );
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getChannel({ channelId, userId }) {
    try {
      const NewUserService = new UserService();

      const channel = fs.readFileSync(`src/db/channels/${channelId}.json`);
      const parsedChannel = JSON.parse(channel.toString());

      if (!parsedChannel.whoJoined.includes(userId)) {
        throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
      }

      const content = fs.readFileSync(`src/db/contents/${channelId}.json`);
      const parsedContent = JSON.parse(content.toString());

      const users = await NewUserService.getUser();

      return {
        ...parsedChannel,
        content: parsedContent,
        whoJoined: parsedChannel.whoJoined.map((userId) => [userId, ...users[userId]]),
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
