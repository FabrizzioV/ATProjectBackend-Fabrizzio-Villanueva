import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transaction } from "./transaction.entity";

@Injectable()
export class TransactionService{
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
    ){}

    findAll(): Promise<Transaction[]> {
        return this.transactionRepository.find();
      }
    
      findOne(id: number): Promise<Transaction> {
        return this.transactionRepository.findOne({where:{transactionId:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.transactionRepository.delete(id);
      }
    
      async create(transaction: Transaction): Promise<Transaction> {
        return this.transactionRepository.save(transaction);
      }
    
      async update(id: number, transaction: Partial<Transaction>): Promise<void> {
        await this.transactionRepository.update(id, transaction);
      }
}