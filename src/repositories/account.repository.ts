import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Account } from "../models/accounts.model";

export class AccountRepository {
    private collection: CollectionReference;
    constructor(){
        this.collection = getFirestore().collection("accountNotPay")
    };

    async getAll(){
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return new Account({
                id: doc.id,
                ...doc.data()
            });
        })
    }

    async getById(id: string){
        const doc = await this.collection.doc(id).get();
        if(doc.exists){
            return new Account({
                id: doc.id,
                ...doc.data()
            });
        } else {
            return null;
        }
    }

    async save(account: Account){
        await this.collection.add(account)
    };

    async update(account: Account){
        let docRef = this.collection.doc(account.id);
        await docRef.set({
            accountName: account.accountName,
            value: account.value,
            won: account.won,
            status: account.status
        });
    };

    async delete(id: string){
        await this.collection.doc(id).delete()
    }
};