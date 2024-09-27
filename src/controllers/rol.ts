import { Request, Response } from 'express';
import RolModel from '../models/rol';
import { validateRol, validateRolUpdate } from '../schemas/rol';
import { Rol } from '../@types/globals';

export class RolController {

    public static async getAllRoles(_req: Request, res: Response) {
        try {
            const roles = await RolModel.findAll();
            res.json(roles);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los roles.", error });
        }
    }

    public static async getRolById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const rol = await RolModel.findByPk(id);

            if (!rol) {
                res.status(404).json({ message: "Rol no encontrado." });
                return;
            }

            res.json(rol);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el rol.", error });
        }
    }

    public static async createRol(req: Request, res: Response) {
        try {
            const result = validateRol(req.body);
            if (!result.success) {
                throw result.error;
            }
            const newRol = await RolModel.create(result.data);
            res.json({ message: "Rol creado exitosamente.", id: (newRol as unknown as Rol).id });
        } catch (error) {
            res.status(500).json({ message: "Error al crear el rol.", error });
        }
    }

    public static async updateRol(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = validateRolUpdate(req.body);
            if (!result.success) {
                throw result.error;
            }
            const updatedRol = await RolModel.update(result.data, { where: { idRol: id } });
            res.json({ message: "Rol actualizado exitosamente.", updated: updatedRol[0] });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el rol.", error });
        }
    }

    public static async deleteRol(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const deletedRol = await RolModel.destroy({ where: { id } });
            res.json({ message: "Rol eliminado exitosamente.", deleted: deletedRol });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el rol.", error });
        }
    }
}

export default RolController;