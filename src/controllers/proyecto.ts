import { Request, Response } from 'express';
import ProyectoModel from '../models/proyecto';

export class ProyectoController {

    public static async getProyectos(_req: Request, res: Response) {
        try {
            const proyectos = await ProyectoModel.findAll();
            res.json(proyectos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los proyectos.", error });
        }
    }

    public static async getProyectoById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const proyecto = await ProyectoModel.findByPk(id);
            if (proyecto) {
                res.json(proyecto);
            } else {
                res.status(404).json({ message: "Proyecto no encontrado." });
            }
        } catch (error) {
            console.error("Error fetching project:", error);
            res.status(500).json({ message: "Error al obtener el proyecto.", error });
        }
    }

    public static async createProyecto(req: Request, res: Response) {
        try {
            const nuevoProyecto = await ProyectoModel.create(req.body);
            res.status(201).json(nuevoProyecto);
        } catch (error) {
            console.error("Error creating project:", error);
            res.status(500).json({ message: "Error al crear el proyecto.", error });
        }
    }

    public static async updateProyecto(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const [updated] = await ProyectoModel.update(req.body, { where: { proyecto_id: id } });
            if (updated) {
                const updatedProyecto = await ProyectoModel.findByPk(id);
                res.json(updatedProyecto);
            } else {
                res.status(404).json({ message: "Proyecto no encontrado." });
            }
        } catch (error) {
            console.error("Error updating project:", error);
            res.status(500).json({ message: "Error al actualizar el proyecto.", error });
        }
    }

    public static async deleteProyecto(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await ProyectoModel.destroy({ where: { proyecto_id: id } });
            if (deleted) {
                res.status(204).json();
            } else {
                res.status(404).json({ message: "Proyecto no encontrado." });
            }
        } catch (error) {
            console.error("Error deleting project:", error);
            res.status(500).json({ message: "Error al eliminar el proyecto.", error });
        }
    }
}
export default ProyectoController;