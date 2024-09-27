// models/asignacion.ts
import { DataTypes } from 'sequelize';
import sequelize from '../db/db';
import EmpleadoModel from './empleado';
import ProyectoModel from './Proyecto';

const AsignacionModel = sequelize.define('asignacion', {
    asignacion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    empleado_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: EmpleadoModel,
            key: 'empleado_id'
        }
    },
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProyectoModel,
            key: 'proyecto_id'
        }
    },
    fecha_asignacion: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'asignaciones',
    timestamps: false
});

AsignacionModel.belongsTo(EmpleadoModel, { foreignKey: 'empleado_id' });
AsignacionModel.belongsTo(ProyectoModel, { foreignKey: 'proyecto_id' });

export default AsignacionModel;