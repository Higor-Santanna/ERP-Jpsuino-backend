import express from "express";
import { initializeApp as initializeAdmin} from 'firebase-admin/app';
import { getFirestore as getAdminFirestore } from "firebase-admin/firestore";
import { initializeApp as initializeFirebaseApp} from "firebase/app";
import { routes } from "./routes";
import { erroHandler } from "./middlewares/error-handler.middeware";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware";
import { auth } from "./middlewares/auth.middleware";

initializeAdmin();
export const db = getAdminFirestore();
initializeFirebaseApp({
    apiKey: process.env.API_KEY
})
const app = express();
const port = 3000;

auth(app)
routes(app);
pageNotFoundHandler(app);
erroHandler(app);

app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}`);
});