import { Request, Response } from "express";
import { Account } from "../models/accounts.model";
import { AccountService } from "../services/account.service";

export class AccountController {
    static async getAll(req: Request, res: Response) {
        res.send(await new AccountService().getAll());
    };

    static async getById(req: Request, res: Response){
        let accountId = req.params.id;
        res.send(await new AccountService().getById(accountId));
    };

    static async save(req: Request, res: Response) {
        let account = req.body as Account;
        await new AccountService().save(account);
        res.status(201).send({
            message: "Conta registrada com sucesso!"
        });
    };

    static async update(req: Request, res: Response) {
        let accountId = req.params.id;
        let account = req.body as Account;
        await new AccountService().update(accountId, account);
        res.status(201).send({
            message: "Informações da divida atualizada com sucesso!"
        })
    };

    static async delete(req: Request, res: Response) {
        let accountId = req.params.id;
        await new AccountService().delete(accountId);
        res.status(204).end();
    };
};