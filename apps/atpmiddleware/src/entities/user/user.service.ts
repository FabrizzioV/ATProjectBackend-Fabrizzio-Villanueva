import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { user } from "./user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(user)
        private userRepository: Repository<user>,
    ){}

    findAll(): Promise<user[]> {
        return this.userRepository.find();
      }
    
      findOne(id: number): Promise<user> {
        return this.userRepository.findOne({where:{userId:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
      }
    
      async create(user: user): Promise<user> {
        return this.userRepository.save(user);
      }
    
      async update(id: number, user: Partial<user>): Promise<void> {
        await this.userRepository.update(id, user);
      }
}