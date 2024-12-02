'use strict';
const BaseModel = require('./BaseModel');

module.exports = (sequelize, DataTypes) => {

    class Rol extends BaseModel {
        static associate(models) {
            Rol.hasMany(models.User, {
                foreignKey: 'rol_id',
                as: 'users',
            });
        }
    }

    Rol.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Genera un UUID automáticamente
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'Rol',
        timestamps: true, // Habilita createdAt y updatedAt
        paranoid: true,   // Habilita deletedAt para la eliminación lógica
    });

    return Rol;
};
