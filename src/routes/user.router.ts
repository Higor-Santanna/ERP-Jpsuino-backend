import express from "express";
import { UsersController } from "../controllers/user.controller";
import asyncHandler from "express-async-handler";
import { userSchema } from "../models/user.model";
import { celebrate, Segments } from "celebrate";

const userRoutes = express.Router();

userRoutes.get("/users", asyncHandler(UsersController.getAll));
userRoutes.post("/users", celebrate({[Segments.BODY]: userSchema}), asyncHandler(UsersController.save));
userRoutes.get("/users/:id", asyncHandler(UsersController.getById));
userRoutes.put("/users/:id", celebrate({[Segments.BODY]: userSchema}) ,asyncHandler(UsersController.update));
userRoutes.delete("/users/:id", asyncHandler(UsersController.delete));

export { userRoutes }