import { Joi } from "celebrate";

export type Account = {
    id: string;
    accountName: string;
    value: number;
    won: Date;
    status: AccountStatus;
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
    status: Joi.string().only().allow(AccountStatus.pending)
});