'use strict';
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Genera un UUID automáticamente
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        dateBirth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        identification: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        postal: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
    }, {
        tableName: 'User',
        timestamps: true, // Habilita createdAt y updatedAt
        paranoid: true,   // Habilita deletedAt para la eliminación lógica
    });

    Usuario.associate = (models) => {
        Usuario.belongsTo(models.Rol, {
            foreignKey: 'rol_id',
            as: 'rol',
        });
    };

    return Usuario;
};
