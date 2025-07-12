import express from "express";
import asyncHandler from "express-async-handler";
import { BillPaidController } from "../controllers/bills-paid.controller";

const billPaidRouter = express.Router();

billPaidRouter.get("/billpaid", asyncHandler(BillPaidController.getAll));
billPaidRouter.get("/billpaid/:id", asyncHandler(BillPaidController.getById));
billPaidRouter.post("/billpaid/:id/pay", asyncHandler(BillPaidController.save));
billPaidRouter.delete("/billpaid/:id", asyncHandler(BillPaidController.delete));

export { billPaidRouter }