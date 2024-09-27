import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const ProyectoModel = sequelize.define('proyecto', {
    proyecto_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    area: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    porcentaje_completado: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    comentarios: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    responsable: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'proyectos',
    timestamps: false
});

export default ProyectoModel;