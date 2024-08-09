import { Injectable } from '@nestjs/common';

@Injectable()
export class SeatMsService {
  getHello(): string {
    return 'Hello World!';
  }
}
