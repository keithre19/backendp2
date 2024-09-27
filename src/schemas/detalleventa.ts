import zod from "zod";

const detalleVentaSchema = zod.object({
    cantidadProducto: zod.number().positive(),
    subtotal: zod.number(),
    idVenta: zod.number().int(),
    idProducto: zod.number()
});

export const validatedetalleVenta = (detalleVenta: any) => {
    return detalleVentaSchema.safeParse(detalleVenta);
}

export const validatedetalleVentaUpdate = (detalleVenta: any) => {
    return detalleVentaSchema.partial().safeParse(detalleVenta);
}