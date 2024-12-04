import { Request, Response } from "express";
import { questionnaireModel } from "../models/QuestionnnairesModel";
import { IQuestionnaire } from "../@types/GlobalTypes";
import { QuestionModel } from "../models/QuestionsModel";
import { OptionModel } from "../models/OptionsModel";
import { UserModel } from "../models/UsersModel";

export const registerQuestionnaires= async (req: Request, res: Response,): Promise<any> => {
    try {
       
        //validar que los datos existen
        const body= req.body;
        if(!body.description || !body.title || !body.userId){
            return res.status(400).json({
                msg: "faltan datos para crear cuestionario"
            })
        }
        /* recibir cuestionario de frontend */
        const questionnaire:IQuestionnaire = {
            description: body.description,
            title: body.title,
            userId: body.userId
        }

        //validar preguntas
        let isInvalidQuestion = false;
        for(const question of body.questions ){
            if(!question.title || !question.type || typeof question.isMandatory == "undefined"){
                isInvalidQuestion = true
            }
            if(question.options.length <= 0 && !question.options[0] || question.options[0].length <= 0){
                isInvalidQuestion = true
            }
        }

        if(isInvalidQuestion){
            return res.status(400).json({
                msg: "Los datos en el cuestionario no es valido"
            })
        }


        const createdQuestionnaire = await questionnaireModel.create(questionnaire);
        for (const question of body.questions) {
            const objQuestion = {
                title: question.title,
                type: question.type,
                isMandatory: question.isMandatory,
                questionnaireId: createdQuestionnaire._id
            };
            const createdQuestion = await QuestionModel.create(objQuestion);
            for (const option of question.options) {
                const objOption = {
                    title: option,
                    questionId: createdQuestion._id
                }
                await OptionModel.create(objOption);
            }
        }
        
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

export const getMetrics = async (req:Request, res:Response): Promise<void>=>{
    try {
        const numberUsers = await UserModel.find({rol:"client"}).countDocuments()
        const numberQuestionnaires = await questionnaireModel.find().countDocuments()

        res.status(200).json({
            msg: "datos  obtenidos con exito", numberQuestionnaires, numberUsers
        })
       return 
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: "Hubo un error al obtener las metricas de la aplicacion"
        })
        return
    }
}

export const getQuestionnaires = async (req:Request, res:Response): Promise<void>=>{
    try {
        const questionnaires = await questionnaireModel.find();
         res.status(200).json({
            msg: "Cuestionarios obtenidos con exito",
            questionnaires})
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Hubo un error al obtener los questionarios"
        })
        return
    }
}