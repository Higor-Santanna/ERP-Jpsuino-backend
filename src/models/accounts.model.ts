import { Joi } from "celebrate";
import { Timestamp } from "firebase-admin/firestore";

export class Account {
    id: string;
    accountName: string;
    billName: string;
    value: number;
    won: Date;
    status: AccountStatus;

    constructor(data: any){
        this.id = data.id;
        this.accountName = data.accountName;
        this.billName = data.billName
        this.value = data.value;
        this.won = data.won instanceof Timestamp ? data.won.toDate() : data.won;
        this.status = data.status;
    }
};

export enum AccountStatus {
    pending = "pendente",
    expired = "vencida",
    pay = "paga"
};

export const newAccountSchema = Joi.object().keys({
    accountName: Joi.string().trim().required(),
    value: Joi.number().required(),
    won: Joi.date().iso().required(),
    status: Joi.string().only().allow(AccountStatus.pending).default(AccountStatus.pending)
});

export const newBillsPaidSchema = Joi.object().keys({
    billName: Joi.string().trim().required(),
    value: Joi.number().required(),
    status: Joi.string().only().required()
})