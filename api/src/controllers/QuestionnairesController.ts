import { Request, Response } from "express";
import { questionnaireModel } from "../models/QuestionnnairesModel";

export const registerQuestionnaires= async (req: Request, res: Response,): Promise<any> => {
    try {
       
        //validar que los datos existen
        const title= req.body.title
        const description= req.body.description
        const userId= req.body.userId

        if (!title || !description || !userId){
            return res.status(400).json({
                msg: "faltan datos para crear cuestionario"
            })
        }

        const questionnaire = await questionnaireModel.create({
           title,
           description,
           userId
        })

        return res.status(200).json({
            msg: "Cuestionario creado con exito", questionnaire
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al crear el cuestionario"
        })
    }
}

export const searchQuestionnaire = async (req:Request, res:Response):Promise<any>=>{
    //verificar que el questionario existe
    try{
        const questionnaire = await questionnaireModel.findOne({title:req.body.title, userId:req.body.userId} )

        if(!questionnaire){
             //si no existe devuelven error
            return res.status(400).json({
                msg: "No existe cuestionario"
            })
        }
              //si existe devuelven token

        return res.status(200).json({
            msg: "Questionario existe",
            questionnaire
        })

    }catch(error){
        return res.status(500).json({
            msg: "Hubo un error al obtener el questionario"
        })
    }
}