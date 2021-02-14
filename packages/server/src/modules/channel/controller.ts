import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import Service from './service';

@Controller('channel')
export default class {
  constructor(private service: Service) {}

  @Post()
  async createChannel(@Body() body) {
    return this.service.createChannel(body);
  }

  @Get(':channelId')
  async getChannel(@Req() req) {
    return this.service.getChannel(req.params.channelId);
  }
}
