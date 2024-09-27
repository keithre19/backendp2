import zod from "zod";

const proveedorSchema = zod.object({
    idProveedor: zod.number().int().optional(),
    direccion: zod.string().max(255),
    telefono: zod.string().max(255),
    descripcion: zod.string().max(255),
    estadoActivo: zod.boolean(),
    nombre: zod.string().max(255)
});

export const validateproveedor = (proveedor: any) => {
    return proveedorSchema.safeParse(proveedor);
}

export const validateproveedorUpdate = (proveedor: any) => {
    return proveedorSchema.partial().safeParse(proveedor);
}