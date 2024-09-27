import zod from "zod";

const rrhhSchema = zod.object({
    nombre: zod.string().max(255),
    edad: zod.string().max(3),
    dpi: zod.string().max(13),
    direccion: zod.string().max(255),
    telefono: zod.string().max(20),
    salario: zod.number().positive().max(99999999.99),
    estadoActivo: zod.boolean(),
});

export const validateRrhh = (rrhh: any) => {
    return rrhhSchema.safeParse(rrhh);
}

export const validateRrhhUpdate = (rrhh: any) => {
    return rrhhSchema.partial().safeParse(rrhh);
}