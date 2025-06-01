import {z} from "zod";

export const blogSchema = z.object({
    title:z.string().min(5),
    description:z.string().min(10),
    image:z.string().url()
});