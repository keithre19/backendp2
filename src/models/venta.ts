import { DataTypes} from 'sequelize';
import sequelize from '../db/db';

const ventaModel = sequelize.define('venta', {
    idVenta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE
    },
    montoTotal: {
        type: DataTypes.DECIMAL
    },
    idCliente: {
        type: DataTypes.INTEGER
    },
    idRrhh: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'venta',
    timestamps: false
});

export default ventaModel;    