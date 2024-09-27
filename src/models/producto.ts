import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const productoModel = sequelize.define('producto', {
    idProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    precioVenta: {
        type: DataTypes.DECIMAL(10, 2)
    },
    descripcion: {
        type: DataTypes.STRING
    },
    esPerecedero: {
        type: DataTypes.TINYINT
    },
    estadoActivo: {
        type: DataTypes.TINYINT
    }
}, {
    tableName: 'producto',
    timestamps: false
});

export default productoModel;