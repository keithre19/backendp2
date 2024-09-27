import { Request, Response } from 'express';
import sequelize from '../db/db';
import ventaModel from '../models/venta';
import detalleVentaModel from '../models/detalleVenta';
import { validateVenta } from '../schemas/venta';
import { validatedetalleVenta } from '../schemas/detalleventa';
import { venta, detalleventa } from '../@types/globals';

export class ventaController {

    public static async getAll(_req: Request, res: Response) {
        try {
            const [response] = await sequelize.query(`
                SELECT 
                    v.idVenta,
                    v.fecha,
                    v.montoTotal,
                    c.nombre AS clienteNombre,
                    e.nombre AS empleadoNombre
                FROM venta v
                INNER JOIN cliente c ON v.idCliente = c.idCliente
                INNER JOIN rrhh e ON v.idRrhh = e.idRrhh;
            `);
            
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las ventas.", error });
        }
    }

    public static async getById(req: Request, res: Response) {
        try {
            const [response] = await sequelize.query(`
                SELECT 
                    v.idVenta,
                    v.fecha,
                    v.montoTotal,
                    c.nombre AS clienteNombre,
                    e.nombre AS empleadoNombre
                FROM venta v
                INNER JOIN cliente c ON v.idCliente = c.idCliente
                INNER JOIN rrhh e ON v.idRrhh = e.idRrhh
                WHERE v.idVenta = :idVenta
            `, {
                replacements: { idVenta: req.params.id }
            });
            
            if(response.length===0){
                res.json({message: "Venta no encontrada"});
            }
            res.json(response[0]);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener la venta.", error });
        }
    }

    public static async create(req: Request, res: Response) {
        const t = await sequelize.transaction();

        try {
            const ventaResult = validateVenta(req.body.venta);
            if (!ventaResult.success) {
                throw ventaResult.error;
            }

            const newVenta = await ventaModel.create(ventaResult.data, { transaction: t }) as unknown as venta;

            const detalles: detalleventa[] = [];
            for (const detalle of req.body.detalles) {
                const detalleResult = validatedetalleVenta({
                    ...detalle,
                    idVenta: newVenta.idVenta
                });
                if (!detalleResult.success) {
                    throw detalleResult.error;
                }
                const newDetalle = await detalleVentaModel.create(detalleResult.data, { transaction: t }) as unknown as detalleventa;
                detalles.push(newDetalle);
            }

            await t.commit();

            res.json({ 
                message: "Venta y detalles registrados exitosamente.", 
                venta: newVenta,
                detalles: detalles
            });
        } catch (error) {
            await t.rollback();
            res.status(500).json({ message: "Error al registrar la venta y sus detalles.", error });
        }
    }
}

export default ventaController;