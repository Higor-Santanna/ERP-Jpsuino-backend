import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        res.json(await new UserService().getAll());
    };

    static async getById(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        res.send(await new UserService().getById(userId));
    };

    static async save(req: Request, res: Response, next: NextFunction) {
        let user = req.body;
        await new UserService().save(user);
        res.status(201).send({
            message: `Usuário criado com sucesso.`
        });
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        let user = req.body as User;
        await new UserService().update(userId, user);
        res.status(201).send({message: "Informações do usuário atualizado"});
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        await new UserService().delete(userId);
        res.status(204).end();
    };
}