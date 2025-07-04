import { Joi } from "celebrate";
import { Timestamp } from "firebase-admin/firestore";

export class Account {
    id: string;
    accountName: string;
    value: number;
    won: Date;
    status: AccountStatus;

    constructor(data: any){
        this.id = data.id;
        this.accountName = data.accountName;
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

export const newAccount = Joi.object().keys({
    accountName: Joi.string().trim().required(),
    value: Joi.number().required(),
    won: Joi.date().iso().required(),
    status: Joi.string().only().required()
});