import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from "fs";

const channelDto = {
  whoCreatedChannel: "",
  whoJoined: [],
  whoIsOnline: [],
  content: "",
  channelId: "",
};

@Injectable()
export default class Service {
  createChannel({ whoCreatedChannel }) {
    try {
      const channelId = Date.now();

      if (!whoCreatedChannel) {
        throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST);
      }

      fs.writeFileSync(
        `src/db/sessions/${channelId}.json`,
        JSON.stringify({
          ...channelDto,
          whoCreatedChannel,
          whoJoined: [whoCreatedChannel],
          channelId,
        })
      );

      return { channelId };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  getChannel(channelId) {
    try {
      const content = fs.readFileSync(`src/db/sessions/${channelId}.json`);
      const kek = JSON.parse(content.toString());

      return kek;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
