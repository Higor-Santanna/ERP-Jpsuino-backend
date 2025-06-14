import { Joi } from "celebrate";

export type User = {
    id: string;
    nome: string;
    email: string;
};

export const userSchema = Joi.object().keys({
    nome: Joi.string().trim().required(),
    email: Joi.string().email().required()
})