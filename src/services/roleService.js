const { Rol } = require('../models');
const AppError = require('../utils/AppError')

// Crear un nuevo rol
exports.createRole = async (name) => {
    try {
        const role = await Rol.create({ name });
        return role;
    } catch (error) {
        throw error;
    }
};

// Listar todos los roles
exports.listRoles = async () => {
    try {
        const roles = await Rol.findAll({
            where: {
                deletedAt: null
            },
            attributes: { exclude: ['deletedAt'] }
        });
        return roles;
    } catch (error) {
        throw error;
    }
};

// Obtener un rol por ID
exports.getRoleById = async (id) => {
    try {
        const role = await Rol.findByPk(id,{
            where: {
                deletedAt: null
            },
            attributes: { exclude: ['deletedAt'] }
        });
        if (!role) {
            throw new AppError('El rol no existe o ha sido eliminado.', 404);
        }
        return role;
    } catch (error) {
        throw error;
    }
};

// Actualizar un rol
exports.updateRole = async (id, roleData) => {
    try {
        const role = await Rol.findByPk(id,{
            where: {
                deletedAt: null
            }
        });
        if (!rol) {
            throw new AppError('El rol no existe o ha sido eliminado.', 404);
        }
        await role.update(roleData);
        return role;
    } catch (error) {
        throw error;
    }
};

// Eliminar un rol (eliminación lógica)
exports.deleteRole = async (id) => {
    try {
        const role = await Rol.findByPk(id);
        if (!role || role.deletedAt !== null) {
            throw new AppError('El rol no existe.', 404);
        }
        await role.destroy();
        return true;
    } catch (error) {
        throw error;
    }
};
