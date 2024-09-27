import { Request, Response } from 'express';
import EmpleadoModel from '../models/empleado';

export class EmpleadoController {
    public static async getEmpleados(_req: Request, res: Response) {
        try {
            const empleados = await EmpleadoModel.findAll();
            res.json(empleados);
        } catch (error) {
            console.error("Error fetching employees:", error);
            res.status(500).json({ message: "Error al obtener los empleados.", error });
        }
    }

    public static async getEmpleadoById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const empleado = await EmpleadoModel.findByPk(id);
            if (empleado) {
                res.json(empleado);
            } else {
                res.status(404).json({ message: "Empleado no encontrado." });
            }
        } catch (error) {
            console.error("Error fetching employee:", error);
            res.status(500).json({ message: "Error al obtener el empleado.", error });
        }
    }

    public static async createEmpleado(req: Request, res: Response) {
        try {
            const nuevoEmpleado = await EmpleadoModel.create(req.body);
            res.status(201).json(nuevoEmpleado);
        } catch (error) {
            console.error("Error creating employee:", error);
            res.status(500).json({ message: "Error al crear el empleado.", error });
        }
    }

    public static async updateEmpleado(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const [updated] = await EmpleadoModel.update(req.body, { where: { empleado_id: id } });
            if (updated) {
                const updatedEmpleado = await EmpleadoModel.findByPk(id);
                res.json(updatedEmpleado);
            } else {
                res.status(404).json({ message: "Empleado no encontrado." });
            }
        } catch (error) {
            console.error("Error updating employee:", error);
            res.status(500).json({ message: "Error al actualizar el empleado.", error });
        }
    }

    public static async deleteEmpleado(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await EmpleadoModel.destroy({ where: { empleado_id: id } });
            if (deleted) {
                res.status(204).json();
            } else {
                res.status(404).json({ message: "Empleado no encontrado." });
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
            res.status(500).json({ message: "Error al eliminar el empleado.", error });
        }
    }
}