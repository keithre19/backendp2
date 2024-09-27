import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const EmpleadoModel = sequelize.define('empleado', {
    empleado_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    puesto: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'empleados',
    timestamps: false
});

export default EmpleadoModel;