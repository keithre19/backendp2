import { z } from 'zod';

export const usuarioSchema = z.object({
    idUsuario: z.number().int().optional(),
    usuario: z.string().max(255),
    contrasenia: z.string().max(255),
    estadoActivo: z.boolean(),
    idRol: z.number().int(),
    idRrhh: z.number().int()
});

export const validateUsuario = (data: any) => {
    return usuarioSchema.safeParse(data);
};

export const validateUsuarioUpdate = (data: any) => {
    return usuarioSchema.partial().safeParse(data);
};