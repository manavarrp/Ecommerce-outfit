"use server"

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
    try {
      await prisma.userAddress.delete({
        where: {
          userId,
        },
      });
  
      return {
        ok: true,
        message: "Se elimino la dirección",
      };
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo eliminar la dirección");
    }
  };
  