// controllers/asignacionController.ts
import { Request, Response } from 'express';
import AsignacionModel from '../models/asignacion';

export class AsignacionController {
    public static async getAsignaciones(_req: Request, res: Response) {
        try {
            const asignaciones = await AsignacionModel.findAll();
            res.json(asignaciones);
        } catch (error) {
            console.error("Error fetching assignments:", error);
            res.status(500).json({ message: "Error al obtener las asignaciones.", error });
        }
    }

    public static async getAsignacionById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const asignacion = await AsignacionModel.findByPk(id);
            if (asignacion) {
                res.json(asignacion);
            } else {
                res.status(404).json({ message: "Asignación no encontrada." });
            }
        } catch (error) {
            console.error("Error fetching assignment:", error);
            res.status(500).json({ message: "Error al obtener la asignación.", error });
        }
    }

    public static async createAsignacion(req: Request, res: Response) {
        try {
            const nuevaAsignacion = await AsignacionModel.create(req.body);
            res.status(201).json(nuevaAsignacion);
        } catch (error) {
            console.error("Error creating assignment:", error);
            res.status(500).json({ message: "Error al crear la asignación.", error });
        }
    }

    public static async updateAsignacion(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const [updated] = await AsignacionModel.update(req.body, { where: { asignacion_id: id } });
            if (updated) {
                const updatedAsignacion = await AsignacionModel.findByPk(id);
                res.json(updatedAsignacion);
            } else {
                res.status(404).json({ message: "Asignación no encontrada." });
            }
        } catch (error) {
            console.error("Error updating assignment:", error);
            res.status(500).json({ message: "Error al actualizar la asignación.", error });
        }
    }

    public static async deleteAsignacion(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await AsignacionModel.destroy({ where: { asignacion_id: id } });
            if (deleted) {
                res.status(204).json();
            } else {
                res.status(404).json({ message: "Asignación no encontrada." });
            }
        } catch (error) {
            console.error("Error deleting assignment:", error);
            res.status(500).json({ message: "Error al eliminar la asignación.", error });
        }
    }
}