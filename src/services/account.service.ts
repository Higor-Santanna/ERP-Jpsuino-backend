import dayjs from "dayjs";
import { ValidationError } from "../errors/validation.error";
import { Account, AccountStatus } from "../models/accounts.model";
import { AccountRepository } from "../repositories/account.repository";
import { NotFoundError } from "../errors/not-found.error";

export class AccountService {
    private accountRepository: AccountRepository;

    constructor() {
        this.accountRepository = new AccountRepository();
    };

    async getAll() {
        const accounts = await this.accountRepository.getAll();
        const today = dayjs().startOf("day");

        for(const account of accounts){
            const wonDate = dayjs(account.won).startOf('day');
            if(account.status === AccountStatus.pending && wonDate.isBefore(today)){
                account.status = AccountStatus.expired;
                await this.accountRepository.update(account);
            };
        };
        return accounts;
    };

    async getById(id: string){
        const accountId = await this.accountRepository.getById(id);
        const today = dayjs().startOf('day')
        const wonDate = dayjs(accountId?.won).startOf('day');

        if(accountId?.status === AccountStatus.pending && wonDate.isBefore(today)){
            accountId.status = AccountStatus.expired;
            await this.accountRepository.update(accountId);
        };

        if(!accountId) {
            throw new NotFoundError("Conta não encontrada!")
        };
        return accountId;
    };

    async save(account: Account) {
        const wonDate = dayjs(account.won).add(1, "day").startOf("day");
        const today = dayjs().startOf("day");

        if(account.value <= 0 ){
            throw new ValidationError("O valor da conta precisa ser positivo.")
        };

        if(!wonDate.isValid() || wonDate.isBefore(today)) {
            throw new ValidationError("A data da conta não pode ser anterior à data atual ou está inválida.");
        };

        account.won = wonDate.toDate();

        if(account.status != "pendente"){
            throw new ValidationError("O status é obrigatório ser pendente");
        };

        await this.accountRepository.save(account)
    }

    async update(id: string, account: Account){
        const accountUp = await this.accountRepository.getById(id);
        if (!accountUp) {
            throw new NotFoundError("Conta não encontrada!");
        }

        if(account.value <= 0 ){
            throw new ValidationError("O valor da conta precisa ser positivo.")
        };

        const wonDate = dayjs(account.won).add(1, "day").startOf("day");
        const today = dayjs().startOf("day");

        accountUp.accountName = account.accountName;
        accountUp.value = account.value;
        accountUp.won = account.won;
        accountUp.status = account.status;

        if(!wonDate.isValid() || wonDate.isBefore(today)) {
            throw new ValidationError("A data da conta não pode ser anterior à data atual ou está inválida.");
        };

        if(account.status != AccountStatus.pending){
            throw new ValidationError("O status é obrigatório ser pendente");
        };

        await this.accountRepository.update(accountUp)
    };

    async delete(id: string){
        await this.accountRepository.delete(id)
    };
};