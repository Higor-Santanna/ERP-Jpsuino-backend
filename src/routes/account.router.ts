import express from "express";
import { AccountController } from "../controllers/accounts.controller";
import asyncHandler from "express-async-handler";
import { newAccountSchema } from "../models/accounts.model";
import { celebrate, Segments } from "celebrate";

const accountRoutes = express.Router();

accountRoutes.get("/accounts", asyncHandler(AccountController.getAll));
accountRoutes.post("/accounts", celebrate({[Segments.BODY]: newAccountSchema}), asyncHandler(AccountController.save));
accountRoutes.put("/accounts/:id", celebrate({[Segments.BODY]: newAccountSchema}), asyncHandler(AccountController.update));
accountRoutes.delete("/accounts/:id", asyncHandler(AccountController.delete))

export { accountRoutes }