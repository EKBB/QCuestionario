import { Schema } from "mongoose";

export interface IUser {
    name: String;
    email: String;
    lastName: String;
    password: String;
    rol: "administrador" | "client"
}

export interface IQuestionnaire {
    title: String;
    description: String;
    userId: Schema.Types.ObjectId | String;
}

export interface IQuestion {
    title: String;
    type: "checkbox" | "radio" | "select" | "text";
    isMandatory: boolean;
    questionnaireId: Schema.Types.ObjectId | String;
}

export interface IAnswer {
    questionnaireId: Schema.Types.ObjectId | String;
    questionId: Schema.Types.ObjectId | String;
    answer: String;
}

export interface IOption {
    questionId: Schema.Types.ObjectId | String;
    title: String;
}