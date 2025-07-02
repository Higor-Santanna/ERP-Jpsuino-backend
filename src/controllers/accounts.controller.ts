import { Request, Response } from "express";
import { Account } from "../models/accounts.model";
import { AccountService } from "../services/account.service";

export class AccountController{
    static async getAll(req: Request, res: Response){
        res.send(await new AccountService().getAll())
    }

    static async save(req: Request, res: Response){
        let account = req.body as Account;
        await new AccountService().save(account);
        res.status(201).send({
            message: "Conta registrada com sucesso!"
        });
    };
};