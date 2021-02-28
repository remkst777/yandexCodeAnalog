import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import Service from './service';

import { USER_ROLES } from '../../common/constants';

@Controller('users')
export default class {
  constructor(private service: Service) {}

  @Post()
  async saveUser(@Body() body) {
    return this.service.saveUser(body);
  }

  @Get(':userId')
  async getUser(@Req() { params: { userId } }) {
    return this.service.getUser(userId) || [USER_ROLES.WRONG];
  }
}
