import { getFirestore } from "firebase-admin/firestore";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/validation.error";

type User = {
    id: number,
    nome: string,
    email: string
}

export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const snapshot = await getFirestore().collection("users").get();
            const users = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
            res.json(users)
        } catch (error) {
            next(error)
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            let userId = req.params.id;
            const doc = await getFirestore().collection("users").doc(userId).get();
            res.send({
                id: doc.id,
                ...doc.data()
            });
        } catch (error) {
            next(error)
        }
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        try {
            let user = req.body;
            if (!user.email || user.email?.length === 0) {
                throw new ValidationError("Email obrigatório")
            }
            const userSave = await getFirestore().collection("users").add(user);
            res.send({
                message: `Usuário ${userSave.id} criado com sucesso.`
            });
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            let userId = req.params.id;
            let user = req.body as User;
            await getFirestore().collection("users").doc(userId).set({
                nome: user.nome,
                email: user.email
            })
            res.send({ message: "Informações do usuário atualizado" });
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            let userId = req.params.id;
            await getFirestore().collection("users").doc(userId).delete();
            res.send({ message: "Usuário deletado" });
        } catch (error) {
            next(error)
        }
    }
}