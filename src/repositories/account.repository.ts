import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Account } from "../models/accounts.model";
import dayjs from "dayjs";

export class AccountRepository {
    private collection: CollectionReference;
    constructor(){
        this.collection = getFirestore().collection("accountNotPay")
    };

    async getAll(){
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return new Account({
                ...doc.data()
            });
        })
    }

    async save(account: Account){
        const wonDate = dayjs(account.won).add(1, "day").startOf("day").toDate();
        account.won = wonDate;
        await this.collection.add(account)
    };
}