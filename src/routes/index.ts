import express from "express"
import { userRoutes } from "./user.router";
import { authRoutes } from "./auth.router";

const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(authRoutes);
    app.use(userRoutes);
}

export { routes }