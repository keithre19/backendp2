import { Request, Response } from 'express';
import RrhhModel from '../models/rrhh';
import { validateRrhh, validateRrhhUpdate } from '../schemas/rrhh';
import { Rrhh } from '../@types/globals';

export class RrhhController {
    public static async createRrhh(req: Request, res: Response) {
        try {
            //añadir estadoActivo
            req.body.estadoActivo = true;

            const result = validateRrhh(req.body);
            if (!result.success) {
                throw result.error;
            }
            const newRrhh = await RrhhModel.create(result.data);
            res.json({ message: "Rrhh creado exitosamente.", id: (newRrhh as unknown as Rrhh).idRrhh });
        } catch (error) {
            res.status(500).json({ message: "Error al crear el rrhh.", error });
        }
    }

    public static async updateRrhh(req: Request, res: Response) {
        try {
            const result = validateRrhhUpdate(req.body);
            if (!result.success) {
                throw result.error;
            }
            await RrhhModel.update(result.data, { where: { idRrhh: req.params.id } });
            res.json({ message: "Rrhh actualizado exitosamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el rrhh.", error });
        }
    }

    public static async deleteRrhh(req: Request, res: Response) {
        try {
            await RrhhModel.update(
                { estadoActivo: false }, 
                { where: { idRrhh: req.params.id } }
            );
            res.json({ message: "Rrhh eliminado exitosamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el rrhh.", error });
        }
    }

    public static async restoreRrhh(req: Request, res: Response) {
        try {
            await RrhhModel.update(
                { estadoActivo: true }, 
                { where: { idRrhh: req.params.id } }
            );
            res.json({ message: "Rrhh restaurado exitosamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al restaurar el rrhh.", error });
        }
    }

    public static async getRrhh(req: Request, res: Response) {
        try {
            const rrhh = await RrhhModel.findByPk(req.params.id);
            if (!rrhh) {
                res.status(404).json({ message: "Rrhh no encontrado." });
            } else {
                res.json(rrhh);
            }
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el rrhh.", error });
        }
    }

    public static async getRrhhList(req: Request, res: Response) {
        try {
            const estadoActivo = req.params.state;
            const rrhhList = await RrhhModel.findAll({where: {estadoActivo: estadoActivo}});
            res.json(rrhhList);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener la lista de rrhh.", error });
        }
    }
}

export default RrhhController;