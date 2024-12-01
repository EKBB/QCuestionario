import express, { Application, Request, Response } from "express";
import cors from "cors";
import { registerUsers, singin } from "./controllers/UserControler";
import { registerQuestionnaires, searchQuestionnaire } from "./controllers/QuestionnairesController";
import { registerQuestion, searchQuestion } from "./controllers/QuestionController";
import { registerOption, searchOption } from "./controllers/OptionController";
import { registerAnswer, searchAnswer } from "./controllers/AnswerController";


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
app.post("/questionnaires/search", searchQuestionnaire)

//QUESTIONS
app.post("/questions/create", registerQuestion)
app.post("/questions/search", searchQuestion)

//OPTIONS
app.post("/options/create", registerOption)
app.post("/options/search", searchOption)

//ANSWERS
app.post("/answers/create", registerAnswer)
app.post("/answers/search", searchAnswer)

export default app;