import { ErrorBase } from "./base.error";

export class EmailAlreadyExistsError extends ErrorBase {
    constructor(message = "O e-mail já está em uso por outra conta"){
        super(409, message);
    };
};