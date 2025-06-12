import express from "express";
import { initializeApp } from 'firebase-admin/app';
import { routes } from "./routes";
import { erroHandler } from "./middlewares/error-handler.middeware";

const app = express();
const port = 3000;

initializeApp();
routes(app)
erroHandler(app);

app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}`);
});