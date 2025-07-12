import express from "express";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";import { newBillsPaidSchema } from "../models/accounts.model";
import { BillPaidController } from "../controllers/bills-paid.controller";

const billPaidRouter = express.Router();

billPaidRouter.get("/billpaid", asyncHandler(BillPaidController.getAll));
billPaidRouter.get("/billpaid/:id", asyncHandler(BillPaidController.getById));
billPaidRouter.post("/billpaid", celebrate({[Segments.BODY]: newBillsPaidSchema}), asyncHandler(BillPaidController.save));
billPaidRouter.delete("/billpaid/:id", asyncHandler(BillPaidController.delete));

export { billPaidRouter }