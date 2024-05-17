"use server";

import { Address } from "@/interfaces/address.interface";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const saveAddress = await createOrReplaceAddress(address, userId);
    return {
      ok: true,
      saveAddress,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo registrar la dirección",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    const addressPayload = {
      userId: userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      postalCode: address.postalCode,
      city: address.city,
      phone: address.phone,
      countryId: address.country,
    };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressPayload,
      });
      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressPayload,
    });

    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo registrar la dirección");
  }
};

