import { DataTypes} from 'sequelize';
import sequelize from '../db/db';

const RolModel = sequelize.define('rol', {
    idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'rol',
    timestamps: false
});

export default RolModel;    