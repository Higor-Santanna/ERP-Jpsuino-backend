import { ErrorBase } from "./base.error";

export class UnauthorizedError extends ErrorBase {
    constructor(message = "Usuário não autorizado"){
        super(401, message)
    };
};