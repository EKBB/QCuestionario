import { Schema, model } from "mongoose";
import { IQuestionnaire } from "../@types/GlobalTypes";


const questionnaireSchema = new Schema<IQuestionnaire>({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

export const questionnaireModel = model("questionnaires", questionnaireSchema)