import express from "express"
import { userRoutes } from "./user.router";
import { authRoutes } from "./auth.router";
import { accountRoutes } from "./account.router";
import { billPaidRouter } from "./bills-paid.router";

const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(authRoutes);
    app.use(userRoutes);
    app.use(accountRoutes);
    app.use(billPaidRouter);
}

export { routes }