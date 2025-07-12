import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Account } from "../models/accounts.model";

export class BillsPaidRepository {
    private collection: CollectionReference;
    constructor() {
        this.collection = getFirestore().collection("billsPaid")
    };

    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return new Account({
                id: doc.id,
                ...doc.data()
            });
        });
    };

    async getById(id: string) {
        const doc = await this.collection.doc(id).get();
        if(doc.exists){
            return{
                id: doc.id,
                ...doc.data()
            } as Account
        } else {
            return null;
        };
    };

    async save(account: Account){
        await this.collection.add(account);
    };

    async delete(id: string){
        await this.collection.doc(id).delete();
    };
}