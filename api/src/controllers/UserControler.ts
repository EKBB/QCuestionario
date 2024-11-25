import { Request, Response } from "express";
import { UserModel } from "../models/UsersModel";
import jwt from "jsonwebtoken"

export const registerUsers= async (req: Request, res: Response,): Promise<any> => {
    try {
       
        //validar que los datos existen
        const name= req.body.name
        const email = req.body.email
        const lastName= req.body.lastName
        const password= req.body.password
        const rol= req.body.rol

         //Administradores no pueden crear clientes
         if(req.user?.rol === "administrador" && rol == "client"){
            return res.status(400).json({
                msg: "Los administradores no pueden crear clientes"
            })
         }
        if (!name || !email || !lastName || !password || !rol){
            return res.status(400).json({
                msg: "faltan datos para crear un usuario"
            })
        }
        
        //validar que el usuario sea administrador si el usuario a crear es administrador
        if(rol == "administrador" && req.user?.rol != "administrador"){
            return res.status(400).json({
                msg: "No puedes crear administradores si no eres uno"
            })
        }

        const user= await UserModel.create({
            name,
            email,
            lastName,
            password,
            rol
        })
        const token = jwt.sign(JSON.stringify(user),"pocoyo");

        return res.status(200).json({
            msg: "Usuario registrado con exito",
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al crear el usuario"
        })
    }
}

export const singin = async (req:Request, res:Response):Promise<void>=>{
    //correo y contraseña
    //verificar que el usuario existe
    const user = await UserModel.findOne({email:req.body.email, password:req.body.passwordl} )
    //si no existe devuelven error
    //si existe devuelven token
}