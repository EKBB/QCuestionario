import { Request, Response } from "express";
import { QuestionModel } from "../models/QuestionsModel";

export const registerQuestion= async (req: Request, res: Response,): Promise<any> => {
    try {
       
        //validar que los datos existen
        const title= req.body.title
        const type = req.body.type
        const isMandatory= req.body.isMandatory
        const questionnaireId= req.body.questionnaireId

        if (!title || !type || isMandatory === undefined || !questionnaireId){
            return res.status(400).json({
                msg: "faltan datos para crear una pregunta"
            })
        }

        const question= await QuestionModel.create({
            title,
            type,
            isMandatory,
            questionnaireId,
        })

        return res.status(200).json({
            msg: "pregunta creada con exito", question
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al crear pregunta"
        })
    }
}

export const searchQuestion = async (req:Request, res:Response):Promise<any>=>{
    //verificar que la pregunta existe
    try{
        const question = await QuestionModel.findOne({title:req.body.title, questionnaireId:req.body.questionnaireId} )

        if(!question){
             //si no existe devuelven error
            return res.status(400).json({
                msg: "No existe la pregunta"
            })
        }

        return res.status(200).json({
            msg: "pregunta existe", question
        })

    }catch(error){
        return res.status(500).json({
            msg: "Hubo un error buscar la pregunta"
        })
    }
}