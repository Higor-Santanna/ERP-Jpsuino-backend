import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Account } from "../models/accounts.model";

export class AccountRepository {
    private collection: CollectionReference;
    constructor(){
        this.collection = getFirestore().collection("accountNotPay")
    };

    async getAll(){
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => doc.data());
    }

    async save(account: Account){
        await this.collection.add(account)
    };
}