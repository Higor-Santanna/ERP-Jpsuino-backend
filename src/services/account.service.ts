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
        return this.accountRepository.getAll();
    };

    async getById(id: string){
        const accountId = await this.accountRepository.getById(id);
        if(!accountId) {
            throw new NotFoundError("Conta não encontrada!")
        }
        return accountId;
    };

    async save(account: Account) {
        const wonDate = dayjs(account.won).add(1, "day").startOf("day");
        const today = dayjs().startOf("day");

        if(!wonDate.isValid() || wonDate.isBefore(today)) {
            throw new ValidationError("A data da conta não pode ser anterior à data atual ou está inválida.");
        }

        account.won = wonDate.toDate();

        if(account.status != "pendente"){
            throw new ValidationError("O status é obrigatório ser pendente");
        }
        await this.accountRepository.save(account)
    }

    async update(id: string, account: Account){
        const accountUp = await this.accountRepository.getById(id);
        if (!accountUp) {
            throw new NotFoundError("Conta não encontrada!");
        }

        const wonDate = dayjs(account.won).add(1, "day").startOf("day");
        const today = dayjs().startOf("day");

        accountUp.accountName = account.accountName;
        accountUp.value = account.value;
        accountUp.won = account.won;
        accountUp.status = account.status;

        if(wonDate.isBefore(today) && accountUp.status !== "paga"){
            accountUp.status = AccountStatus.expired;
        } else {
            throw new ValidationError("Não é possivel atualizar o status da conta com esta data.")
        }

        await this.accountRepository.update(accountUp)
    };

    async delete(id: string){
        await this.accountRepository.delete(id)
    };
};