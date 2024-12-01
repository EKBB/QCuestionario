import { Request, Response } from "express";
import { OptionModel } from "../models/OptionsModel";

export const registerOption= async (req: Request, res: Response,): Promise<any> => {
    try {
       
        //validar que los datos existen
        const questionId= req.body.questionId
        const title= req.body.title

        if (!questionId || !title){
            return res.status(400).json({
                msg: "faltan datos para crear una opcion"
            })
        }

        const option= await OptionModel.create({
            questionId,
            title
        })


        return res.status(200).json({
            msg: "opcion agregada con exito",
            option
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al crear la opcion"
        })
    }
}

export const searchOption = async (req:Request, res:Response):Promise<any>=>{
    //verificar que la opcion existe
    try{
        const option = await OptionModel.findOne({title:req.body.title, questionId:req.body.questionId} )

        if(!option){
             //si no existe devuelven error
            return res.status(400).json({
                msg: "No existe la opcion"
            })
        }

        return res.status(200).json({
            msg: "opcion existe",
            option
        })

    }catch(error){
        return res.status(500).json({
            msg: "Hubo un error buscar la opcion"
        })
    }
}