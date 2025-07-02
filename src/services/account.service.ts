import { Account } from "../models/accounts.model";
import { AccountRepository } from "../repositories/account.repository";

export class AccountService{
    private accountRepository: AccountRepository;

    constructor(){
        this.accountRepository = new AccountRepository();
    };

    async getAll(){
        return this.accountRepository.getAll();
    };

    async save(account: Account){
        await this.accountRepository.save(account)
    }
};