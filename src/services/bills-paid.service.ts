import { NotFoundError } from "../errors/not-found.error";
import { BillsPaidRepository } from "../repositories/bills-paid.repository";
import { Account } from "../models/accounts.model";

export class BillsPaidService {
    private BillsPaidRepository:  BillsPaidRepository;

    constructor(){
        this.BillsPaidRepository = new BillsPaidRepository();
    };

    async getAll(){
        return this.BillsPaidRepository.getAll();
    };

    async getById(id: string){
        const billId = await this.BillsPaidRepository.getById(id);
        if(!billId){
            throw new NotFoundError("Conta paga não encontrada!");
        };
        return billId;
    };

    async save(billPaid: Account){
        await this.BillsPaidRepository.save(billPaid);
    };

    async delete(id: string){
        await this.BillsPaidRepository.delete(id);
    };
};