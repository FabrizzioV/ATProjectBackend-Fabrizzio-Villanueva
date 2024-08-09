import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMsService {
  getHello(): string {
    return 'Hello World!';
  }
}
