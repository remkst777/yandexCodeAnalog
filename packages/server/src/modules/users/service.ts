import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';

import ChannelService from '../channel/service';

interface dto {
  role: string;
  userName: string;
  id?: string;
  channelId?: string;
}

@Injectable()
export default class Service {
  async saveUser({ role, userName, id, channelId }: dto) {
    try {
      const NewChannelService = new ChannelService();

      const userId = id || `${Date.now()}`;

      const users = await this.getUser();

      fs.writeFileSync(
        'src/db/users/users.json',
        JSON.stringify({
          ...users,
          [userId]: id ? [users[id][0], userName] : [role, userName],
        }),
      );

      if (!userName) {
        await NewChannelService.addUserToChannel({ channelId, userId });
      }

      return { userId };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getUser(userId?: string) {
    try {
      const users = fs.readFileSync('src/db/users/users.json');
      const parsedUsers = JSON.parse(users.toString());

      return userId ? parsedUsers[userId] : parsedUsers;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
