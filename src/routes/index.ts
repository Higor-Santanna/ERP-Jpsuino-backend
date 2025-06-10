import express from "express"
import { userRoutes } from "./user.router";

const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(userRoutes);
}

export { routes }