import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import Service from './service';

@Controller('channel')
export default class {
  constructor(private service: Service) {}

  @Post()
  async createChannel(@Body() body) {
    return this.service.createChannel(body);
  }

  @Get(':channelId/user/:userId')
  async getChannel(@Req() { params: { channelId, userId } }) {
    return this.service.getChannel({ channelId, userId });
  }
}
