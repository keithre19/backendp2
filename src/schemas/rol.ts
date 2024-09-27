import zod from "zod";

const rolSchema = zod.object({
    rol: zod.string(),
    descripcion: zod.string(),
});

export const validateRol = (rol: any) => {
    return rolSchema.safeParse(rol);
}

export const validateRolUpdate = (rol: any) => {
    return rolSchema.partial().safeParse(rol);
}