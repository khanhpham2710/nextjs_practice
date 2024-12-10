"use server"

import { updateUserProfileSchema, UpdateUserProfileValues } from "@/lib/validation"
import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";

export async function updateUserProfile(values: UpdateUserProfileValues){
    const valiatedValues = updateUserProfileSchema.parse(values);

    const {user} = await validateRequest();

    if (!user) throw new Error("Unauthorized");

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: valiatedValues,
        select: getUserDataSelect(user.id)
    })

    return updatedUser;
}