import {z} from 'zod';

export const noteSchema = z.object({
    title: z.string().min(3, "El titulo debe tener al menos 3 caracteres").max(30, "Titulo demasiado largo, máximo 30 caracteres"),
    body: z.string().min(10, "la nota deber ser mas descriptiva, minimo 10 caracteres").max(200, "La nota es demasiado larga, máximo 200 caracteres"),
});