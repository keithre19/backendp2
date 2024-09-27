import { Request, Response } from 'express';
import detalleVentaModel from '../models/detalleVenta';
import { validatedetalleVenta } from '../schemas/detalleventa';
import { detalleventa } from '../@types/globals';
import sequelize from '../db/db';

export class detalleController {

    public static async getAll(req: Request, res: Response) {
        try {
            const idVenta = req.params.id;
            const [response] = await sequelize.query(`
                SELECT dv.idDetalleVenta,p.nombre as Producto,dv.cantidadProducto as Cantidad,
                dv.subtotal,dv.idVenta 
                FROM detalleventa as dv
                INNER JOIN producto as p
                ON dv.idProducto = p.idProducto
                WHERE idVenta=:idVenta
            `, {
                replacements: { idVenta }
            });
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los detalles.", error });
        }
    }

    public static async create(req: Request, res: Response) {
        try {
            const result = validatedetalleVenta(req.body);
            if (!result.success) {
                throw result.error;
            }
            const newresponse = await detalleVentaModel.create(result.data);
            res.json({ message: "Detalle registrado exitosamente.", id: (newresponse as unknown as detalleventa).idDetalleVenta });
        } catch (error) {
            res.status(500).json({ message: "Error al registrar el detalle.", error });
        }
    }

}

export default detalleController;