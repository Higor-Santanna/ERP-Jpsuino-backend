import { NotFoundError } from "../errors/not-found.error";
import { BillsPaidRepository } from "../repositories/bills-paid.repository";
import { Account, AccountStatus} from "../models/accounts.model";
import { ValidationError } from "../errors/validation.error";
import { AccountRepository } from "../repositories/account.repository";
import { db } from "../index";

export class BillsPaidService {
    private BillsPaidRepository:  BillsPaidRepository;
    private accountRepository: AccountRepository;

    constructor(){
        this.BillsPaidRepository = new BillsPaidRepository();
        this.accountRepository = new AccountRepository();
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

    async payAccount(accountId: string){
        const accountToPay = await this.accountRepository.getById(accountId);
        if(!accountToPay){
            throw new NotFoundError("Esta conta não existe!")
        }

        if(accountToPay.status === AccountStatus.pay){
            throw new ValidationError("Esta conta já está marcada como paga!")
        }

        //Transação do Firestore
        // Isso garante que as 3 operações (buscar, adicionar, deletar) sejam atômicas.
        try {
            await db.runTransaction(async (transaction: any) => { // 'db' é sua instância do Firestore
                // Obter uma referência transacional para o documento
                const accountDocRef = this.accountRepository['collection'].doc(accountId);
                const accountSnapshot = await transaction.get(accountDocRef);

                if(!accountSnapshot.exists){
                    throw new NotFoundError("Conta não encontrada durante a transação.");
                };

                // Criar uma nova conta com status 'paga' para a coleção de contas pagas
                const paidAccountData: Account = {
                    ...accountSnapshot.data() as Account, //Pega todos os dados da conta original
                    id: accountId, //Mantenha o ID original ou gere um novo se preferir para 'billsPaid'
                    status: AccountStatus.pay
                };

                // Adicionar à coleção de contas pagas
                const billPaidDocRef = this.BillsPaidRepository['collection'].doc(accountId);
                transaction.set(billPaidDocRef, paidAccountData);

                // Remover da coleção de contas não pagas
                transaction.delete(accountDocRef);
            });

            return accountId;
        } catch (error: any) {
             if (error instanceof NotFoundError || error instanceof ValidationError) {
                throw error; // Re-lança erros de negócio
            }
            throw new Error("Erro interno ao processar pagamento da conta."); 
        }
    };

    async delete(id: string){
        await this.BillsPaidRepository.delete(id);
    };
};