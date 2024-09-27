import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const UsuarioModel = sequelize.define('usuario', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: {
        type: DataTypes.STRING(255)
    },
    contrasenia: {
        type: DataTypes.STRING(255)
    },
    estadoActivo: {
        type: DataTypes.BOOLEAN
    },
    idRol: {
        type: DataTypes.INTEGER
    },
    idRrhh: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'usuario',
    timestamps: false
});

export default UsuarioModel;