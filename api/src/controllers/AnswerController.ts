import { Request, Response } from "express";
import { AnswerModel } from "../models/AnswersModel";

export const registerAnswer= async (req: Request, res: Response,): Promise<any> => {
    try {
       
        //validar que los datos existen
        const questionnaireId= req.body.questionnaireId
        const questionId= req.body.questionId
        const answer= req.body.answer

        if (!questionnaireId || !questionId || !answer){
            return res.status(400).json({
                msg: "faltan datos para crear una respuesta"
            })
        }

        const Answer= await AnswerModel.create({
            questionnaireId,
            questionId,
            answer
        })


        return res.status(200).json({
            msg: "respuesta registrada con exito",
            Answer
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al registrar la respuesta"
        })
    }
}

export const searchAnswer = async (req:Request, res:Response):Promise<any>=>{
    //verificar que la opcion existe
    try{
        const Answer = await AnswerModel.findOne({questionnaireId:req.body.questionnaireId, questionId:req.body.questionId} )

        if(!Answer){
             //si no existe devuelven error
            return res.status(400).json({
                msg: "No existe la respuesta"
            })
        }

        return res.status(200).json({
            msg: "respuesta existe",
            Answer
        })

    }catch(error){
        return res.status(500).json({
            msg: "Hubo un error al buscar la respuesta"
        })
    }
}