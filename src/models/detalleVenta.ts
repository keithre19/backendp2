import { DataTypes} from 'sequelize';
import sequelize from '../db/db';

const detalleVentaModel = sequelize.define('detalleventa', {
    idDetalleVenta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidadProducto: {
        type: DataTypes.INTEGER
    },
    subtotal: {
        type: DataTypes.DECIMAL
    },
    idVenta: {
        type: DataTypes.INTEGER
    },
    idProducto: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'detalleventa',
    timestamps: false
});

export default detalleVentaModel;    