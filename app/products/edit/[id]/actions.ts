"use server";

import { z } from "zod";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import db from "@/lib/database";

const productSchema = z.object({
    id: z.coerce.number({}),
    photo: z.string({
        required_error: "Photo is required",
    }),
    title: z.string({
        required_error: "Title is required",
    }),
    description: z.string({
        required_error: "Description is required",
    }),
    price: z.coerce.number({
        required_error: "Price is required",
    }),
});

export async function updateProduct(_: any, formData: FormData) {
    const data = {
        id: formData.get("id"),
        photo: formData.get("photo"),
        title: formData.get("title"),
        price: formData.get("price"),
        description: formData.get("description"),
    };
    if (data.photo instanceof File) {
        const photoData = await data.photo.arrayBuffer();
        await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
        data.photo = `/${data.photo.name}`;
    }
    const result = productSchema.safeParse(data);
    if (!result.success) {
        return result.error.flatten();
    } else {

        const product = await db.product.update({
            where: {
                id: result.data.id,
            },
            data: {
                title: result.data.title,
                description: result.data.description,
                price: result.data.price,
                photo: result.data.photo,
            },
        });
        revalidatePath("/home");
        redirect(`/products/${product.id}`);
    }

}