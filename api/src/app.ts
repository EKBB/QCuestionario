import express, { Application, Request, Response } from "express";
import cors from "cors";
import { registerUsers, singin } from "./controllers/UserControler";
import { deleteQuestionnaires, getMetrics, getQuestionnaires, registerQuestionnaires } from "./controllers/QuestionnairesController";



const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
    res.send("Hola desde mi servidor con TS");
})

//USUARIOS
app.post("/users/create",registerUsers)
app.post("/users/login",singin)

//QUESTIONARIO
app.post("/questionnaires/create", registerQuestionnaires)
app.get("/questionnaires/getMetrics", getMetrics)
app.get("/questionnaires/getAll", getQuestionnaires)
app.delete("/questionnaires/deleteQuestionnaire", deleteQuestionnaires)


export default app;