import { DataTypes} from 'sequelize';
import sequelize from '../db/db';

const proveedorModel = sequelize.define('rol', {
    idProveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    direccion: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    estadoActivo: {
        type: DataTypes.TINYINT
    },
    nombre: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'proveedor',
    timestamps: false
});

export default proveedorModel;    