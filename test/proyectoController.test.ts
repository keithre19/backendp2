import request from 'supertest';
import express from 'express';
import ProyectoController from '../src/controllers/proyecto';
import ProyectoModel from '../src/models/proyecto';

const app = express();
app.use(express.json());
app.get('/proyectos', ProyectoController.getProyectos);
app.get('/proyectos/:id', ProyectoController.getProyectoById);
app.post('/proyectos', ProyectoController.createProyecto);
app.put('/proyectos/:id', ProyectoController.updateProyecto);
app.delete('/proyectos/:id', ProyectoController.deleteProyecto);

jest.mock('../src/models/proyecto');

describe('ProyectoController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getProyectos', () => {
        it('should return a list of projects', async () => {
            const mockProjects = [{ id: 1, name: 'Project 1' }];
            (ProyectoModel.findAll as jest.Mock).mockResolvedValue(mockProjects);

            const response = await request(app).get('/proyectos');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProjects);
        });

        it('should handle errors', async () => {
            (ProyectoModel.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/proyectos');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error al obtener los proyectos.');
        });
    });

    describe('getProyectoById', () => {
        it('should return a project by ID', async () => {
            const mockProject = { id: 1, name: 'Project 1' };
            (ProyectoModel.findByPk as jest.Mock).mockResolvedValue(mockProject);

            const response = await request(app).get('/proyectos/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProject);
        });

        it('should handle project not found', async () => {
            (ProyectoModel.findByPk as jest.Mock).mockResolvedValue(null);

            const response = await request(app).get('/proyectos/1');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Proyecto no encontrado.');
        });

        it('should handle errors', async () => {
            (ProyectoModel.findByPk as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/proyectos/1');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error al obtener el proyecto.');
        });
    });

    describe('createProyecto', () => {
        it('should create a new project', async () => {
            const mockProject = { id: 1, name: 'Project 1' };
            (ProyectoModel.create as jest.Mock).mockResolvedValue(mockProject);

            const response = await request(app).post('/proyectos').send({ name: 'Project 1' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockProject);
        });

        it('should handle errors', async () => {
            (ProyectoModel.create as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).post('/proyectos').send({ name: 'Project 1' });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error al crear el proyecto.');
        });
    });

    describe('updateProyecto', () => {
        it('should update an existing project', async () => {
            const mockProject = { id: 1, name: 'Updated Project' };
            (ProyectoModel.update as jest.Mock).mockResolvedValue([1]);
            (ProyectoModel.findByPk as jest.Mock).mockResolvedValue(mockProject);

            const response = await request(app).put('/proyectos/1').send({ name: 'Updated Project' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProject);
        });

        it('should handle project not found', async () => {
            (ProyectoModel.update as jest.Mock).mockResolvedValue([0]);

            const response = await request(app).put('/proyectos/1').send({ name: 'Updated Project' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Proyecto no encontrado.');
        });

        it('should handle errors', async () => {
            (ProyectoModel.update as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).put('/proyectos/1').send({ name: 'Updated Project' });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error al actualizar el proyecto.');
        });
    });

    describe('deleteProyecto', () => {
        it('should delete an existing project', async () => {
            (ProyectoModel.destroy as jest.Mock).mockResolvedValue(1);

            const response = await request(app).delete('/proyectos/1');

            expect(response.status).toBe(204);
        });

        it('should handle project not found', async () => {
            (ProyectoModel.destroy as jest.Mock).mockResolvedValue(0);

            const response = await request(app).delete('/proyectos/1');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Proyecto no encontrado.');
        });

        it('should handle errors', async () => {
            (ProyectoModel.destroy as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).delete('/proyectos/1');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error al eliminar el proyecto.');
        });
    });
});