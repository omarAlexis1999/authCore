'use strict';
module.exports = (sequelize, DataTypes) => {
    const Rol = sequelize.define('Rol', {
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
        tableName: 'Rol',
        timestamps: true, // Habilita createdAt y updatedAt
        paranoid: true,   // Habilita deletedAt para la eliminación lógica
    });

    Rol.associate = (models) => {
        Rol.hasMany(models.Usuario, {
            foreignKey: 'rol_id',
            as: 'users',
        });
    };

    return Rol;
};
