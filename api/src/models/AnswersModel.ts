import { Schema, model } from "mongoose";

interface IAnswer {
    questionnaireId: Schema.Types.ObjectId | String;
    questionId: Schema.Types.ObjectId | String;
    answer: String;
}

const AnswerSchema = new Schema<IAnswer>({
    questionnaireId:{
        type: Schema.Types.ObjectId,
        ref: "questionnaires",
        required: true
    },
    questionId:{
        type: Schema.Types.ObjectId,
        ref: "questions",
        required: true
    },
    answer:{
        type: String,
        required: true
    }
})

export const AnswerModel = model("answers", AnswerSchema)