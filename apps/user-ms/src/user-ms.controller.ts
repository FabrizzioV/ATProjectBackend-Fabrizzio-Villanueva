import { Controller, Get } from '@nestjs/common';
import { UserMsService } from './user-ms.service';
import { UserService } from 'apps/atpmiddleware/src/entities/user/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { user } from 'apps/atpmiddleware/src/entities/user/user.entity';

@Controller()
export class UserMsController {
  constructor(private readonly userMsService: UserMsService,
    private userService: UserService,
  ) {}


  @MessagePattern({ cmd: 'get_user' })
  getUser(id:number): any {
    return this.userService.findOne(id);
  }

  @MessagePattern({ cmd: 'create_user' })
  postUser(user:user): Promise<user> {
    return this.userService.create(user);
  }
}
