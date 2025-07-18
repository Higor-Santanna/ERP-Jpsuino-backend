import { Request, Response } from "express";
import { BillsPaidService } from "../services/bills-paid.service";

export class BillPaidController {
    static async getAll(req: Request, res: Response) {
        res.send(await new BillsPaidService().getAll());
    };

    static async getById(req: Request, res: Response){
        let billId = req.params.id;
        res.send(await new BillsPaidService().getById(billId));
    };

    static async save(req: Request, res: Response){
        let accountId = req.params.id;
        await new BillsPaidService().payAccount(accountId);
        res.status(200).send({
            message: "Conta adicionado nas contas pagas com sucesso!"
        })
    };

    static async delete(req: Request, res: Response){
        let billId = req.params.id;
        res.send(await new BillsPaidService().delete(billId));
        res.status(204).end();
    };
};