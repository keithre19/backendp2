import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const loteModel = sequelize.define('lote', {
    idLote: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria: {
        type: DataTypes.STRING
    },
    cantidadInicial: {
        type: DataTypes.INTEGER
    },
    cantidadDisponible: {
        type: DataTypes.INTEGER
    },
    fechaCaducidad: {
        type: DataTypes.DATE
    },
    fechaIngreso: {
        type: DataTypes.DATE
    },
    estadoActivo: {
        type: DataTypes.TINYINT
    },
    idPedido: {
        type: DataTypes.INTEGER
    },
    idProducto: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'lote',
    timestamps: false
});

export default loteModel;