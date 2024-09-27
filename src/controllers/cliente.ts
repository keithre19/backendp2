import { Request, Response } from 'express';
import clienteModel from '../models/clientes';
import { validateCliente, validateClienteUpdate} from '../schemas/cliente';
// import { cliente } from '../@types/globals';
// import { response } from '../@types/globals';

export class clienteContresponseler {

    public static async getAll(_req: Request, res: Response) {
        try {
            const response = await clienteModel.findAll();
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los clientes.", error });
        }
    }

    public static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const response = await clienteModel.findByPk(id);

            if (!response) {
                res.status(404).json({ message: "Cliente no encontrado." });
                return;
            }

            res.json(response);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el cliente.", error });
        }
    }

    public static async create(req: Request, res: Response) {
        try {
            const result = validateCliente(req.body);
            if (!result.success) {
                throw result.error;
            }
            const newresponse = await clienteModel.create(result.data);
            res.json({ 
                message: "Cliente creado exitosamente.", 
                Cliente: newresponse });
        } catch (error) {
            res.status(500).json({ message: "Error al crear el Cliente.", error });
        }
    }

    public static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = validateClienteUpdate(req.body);
            if (!result.success) {
                throw result.error;
            }
            
            const [numberOfAffectedRows] = await clienteModel.update(result.data, {
                where: { idCliente: id }
            });
    
            if (numberOfAffectedRows === 0) {
                return res.status(404).json({ message: "Cliente no encontrado, o datos erroneos" });
            }
    
            
            const updatedClient = await clienteModel.findByPk(id);
    
            res.json({
                message: "Cliente Actualizado Exitosamente.",
                cliente: updatedClient
            });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el Cliente.", error });
        }
    }
    

    public static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const deletedResponse = await clienteModel.destroy({ where: { idCliente: id } });
            if (deletedResponse === 0) {
                return res.status(404).json({ message: "Cliente no encontrado" });
            }
    
            res.json({ message: "Cliente eliminado exitosamente.", deleted: deletedResponse });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el response.", error });
        }
    }
}

export default clienteContresponseler;