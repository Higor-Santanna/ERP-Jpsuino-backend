import { Joi } from "celebrate";

export type User = {
    id: string;
    nome: string;
    email: string;
    password?: string;
};

export const newUserSchema = Joi.object().keys({
    nome: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const authLoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export const updateUserSchema = Joi.object().keys({
    nome: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6)
});

export const authRecoverySchema = Joi.object().keys({
    email: Joi.string().email().required()
});