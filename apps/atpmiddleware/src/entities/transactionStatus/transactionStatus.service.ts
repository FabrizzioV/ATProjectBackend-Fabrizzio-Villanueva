import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { transactionStatus } from "./transactionStatus.entity";

@Injectable()
export class TransactionStatusService{
    constructor(
        @InjectRepository(transactionStatus)
        private transactionStatusRepository: Repository<transactionStatus>,
    ){}

    findAll(): Promise<transactionStatus[]> {
        return this.transactionStatusRepository.find();
      }
    
      findOne(id: number): Promise<transactionStatus> {
        return this.transactionStatusRepository.findOne({where:{transactionStatusId:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.transactionStatusRepository.delete(id);
      }
    
      async create(transactionStatus: transactionStatus): Promise<transactionStatus> {
        return this.transactionStatusRepository.save(transactionStatus);
      }
    
      async update(id: number, transactionStatus: Partial<transactionStatus>): Promise<void> {
        await this.transactionStatusRepository.update(id, transactionStatus);
      }
}