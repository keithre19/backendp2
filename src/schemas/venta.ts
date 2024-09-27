import zod from "zod";

const proveedorSchema = zod.object({
    fecha: zod.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }).transform((val) => new Date(val)),
    montoTotal: zod.number(),
    idCliente: zod.number().int(),
    idRrhh: zod.number().int()
});

export const validateVenta = (proveedor: any) => {
    return proveedorSchema.safeParse(proveedor);
}

export const validateVentaUpdate = (proveedor: any) => {
    return proveedorSchema.partial().safeParse(proveedor);
}