import { Module } from '@nestjs/common';
import { UserMsController } from './user-ms.controller';
import { UserMsService } from './user-ms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from 'apps/atpmiddleware/src/entities/user/user.entity';
import { UserService } from 'apps/atpmiddleware/src/entities/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([user]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'fabri',
      password: 'fabri',
      database: 'ATProject',
      entities: [user],
    }),
  ],
  controllers: [UserMsController],
  providers: [UserMsService, UserService],
})
export class UserMsModule {}
