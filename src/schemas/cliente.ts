import zod from "zod";

const clienteSchema = zod.object({
    nombre: zod.string().max(255),
    telefono: zod.string().max(13),
    nit: zod.string().max(13),
});

export const validateCliente = (cliente: any) => {
    return clienteSchema.safeParse(cliente);
}

export const validateClienteUpdate = (cliente: any) => {
    return clienteSchema.partial().safeParse(cliente);
}