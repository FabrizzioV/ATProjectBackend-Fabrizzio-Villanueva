import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { paymentMethod } from "./paymentMethod.entity";

@Injectable()
export class PaymentMethodService{
    constructor(
        @InjectRepository(paymentMethod)
        private paymentMethodRepository: Repository<paymentMethod>,
    ){}

      findAll(): Promise<paymentMethod[]> {
        return this.paymentMethodRepository.find();
      }
    
      findOne(id: number): Promise<paymentMethod> {
        return this.paymentMethodRepository.findOne({where:{paymentMethodId:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.paymentMethodRepository.delete(id);
      }
    
      async create(paymentMethod: paymentMethod): Promise<paymentMethod> {
        return this.paymentMethodRepository.save(paymentMethod);
      }
    
      async update(id: number, paymentMethod: Partial<paymentMethod>): Promise<void> {
        await this.paymentMethodRepository.update(id, paymentMethod);
      }
}