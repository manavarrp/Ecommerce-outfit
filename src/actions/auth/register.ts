"use server";

import bcryptjs from 'bcryptjs';
import prisma from '@/lib/prisma';
import email from 'next-auth/providers/email';


export const registerUser = async(name: string, email: string, password: string)=>{

    const emailExists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(emailExists) {
        return {
            ok: false,
            message: 'El correo ya existe'
        }
    }

    try {

     
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password:  bcryptjs.hashSync(password)
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return {
            ok: true,
            user,
            message: 'Usuario registrado'
        }
    } catch (error) {
        console.log(error)
        return {
            ok:false,
            message: 'Error al registrar usuario'
        }
    }

}