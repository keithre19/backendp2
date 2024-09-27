import { DataTypes} from 'sequelize';
import sequelize from '../db/db';

const clienteModel = sequelize.define('cliente', {
    idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    nit: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'cliente',
    timestamps: false
});

export default clienteModel;    