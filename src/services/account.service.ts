import dayjs from "dayjs";
import { ValidationError } from "../errors/validation.error";
import { Account } from "../models/accounts.model";
import { AccountRepository } from "../repositories/account.repository";

export class AccountService {
    private accountRepository: AccountRepository;

    constructor() {
        this.accountRepository = new AccountRepository();
    };

    async getAll() {
        return this.accountRepository.getAll();
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
};