import { Schema, model } from "mongoose";

interface IQuestion {
    title: String;
    type: "checkbox" | "radio" | "select" | "text";
    isMandatory: boolean;
    questionnaireId: Schema.Types.ObjectId | String;
}

const QuestionSchema = new Schema<IQuestion>({
    title:{
        type: String,
        required: true
    },
    type:{
        type: String,
        enum: ["checkbox", "radio",  "select",  "text"],
        required: true
    },
    isMandatory:{
        type: Boolean,
        required: true
    },
    questionnaireId:{
        type: Schema.Types.ObjectId,
        ref: "questionnaires",
        required: true
    }
})

export const QuestionModel = model("questions", QuestionSchema)