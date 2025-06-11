import { getFirestore } from "firebase-admin/firestore";
import { Request, Response } from "express";

type User = {
    id: number,
    nome: string,
    email: string
}

export class UsersController {
    static async getAll (req: Request, res: Response){
        const snapshot = await getFirestore().collection("users").get();
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
        res.json(users)
    }

    static async getById(req: Request, res: Response){
        let userId = req.params.id;
        const doc = await getFirestore().collection("users").doc(userId).get();
        res.send({
                id: doc.id,
                ...doc.data()
            });
    }

    static async save(req: Request, res: Response){
        let user = req.body;
        const userSave = await getFirestore().collection("users").add(user);
        res.send({
            message: `Usuário ${userSave.id} criado com sucesso.`
        });
    }

    static async update(req:Request, res: Response){
        let userId = req.params.id;
        let user = req.body as User;
        await getFirestore().collection("users").doc(userId).set({
            nome: user.nome,
            email : user.email
        })
        res.send({ message: "Informações do usuário atualizado"});
    }

    static async delete(req: Request, res: Response){
        let userId = req.params.id;
        await getFirestore().collection("users").doc(userId).delete();
        res.send({ message: "Usuário deletado"});
    }
}