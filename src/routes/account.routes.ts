import express from "express";
import { AccountController } from "../controllers/accounts.controller";
import asyncHandler from "express-async-handler";
import { newAccount } from "../models/accounts.model";
import { celebrate, Segments } from "celebrate";

const accountRoutes = express.Router();

accountRoutes.get("/accounts", asyncHandler(AccountController.getAll));
accountRoutes.post("/accounts", celebrate({[Segments.BODY]: newAccount}), asyncHandler(AccountController.save));

export { accountRoutes }