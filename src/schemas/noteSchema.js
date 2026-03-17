import {z} from 'zod';

export const noteSchema = z.object({
    title: z.string().min(1, "El titulo debe tener al menos un caracter").max(100, "Title must be less than 100 characters"),
    body: z.string().min(1, "El cuerpo es requerido").max(500, "Body must be less than 500 characters"),
});