import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { User } from "../models/user.model";
import { FirebaseAuthError, getAuth, UpdateRequest, UserRecord } from "firebase-admin/auth";
import { getAuth as getFirebaseAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

export class AuthService {
    async create(user: User): Promise<UserRecord> {
        try {
            return await getAuth().createUser({
                email: user.email,
                password: user.password,
                displayName: user.nome
            });
        } catch (err) {
            if (err instanceof FirebaseAuthError && err.code === "auth/email-already-exists") {
                throw new EmailAlreadyExistsError();
            }
            throw err;
        }
    }

    async login(email: string, password: string){
        return await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
            .catch (err => {
            if (err.code === "auth/invalid-credential") {
                throw new UnauthorizedError();
            }
            throw err;
        });
    };

    async update(id: string, user: User){
        const props: UpdateRequest = {
            displayName: user.nome, 
            email:user.email
        };

        if(user.password){
            props.password = user.password
        }; //Isso faz com que a senha não seja obrigatória na hora de passar para o authentication.

        await getAuth().updateUser(id, props);
    };

    async delete(id: string){
        await getAuth().deleteUser(id);
    };

    async recovery(email: string){
        await sendPasswordResetEmail(getFirebaseAuth(), email);
    };
};