const { Rol } = require('../models');
const AppError = require('../utils/AppError')

// Crear un nuevo rol
exports.createRole = async (name) => {
    try {
        const role = await Rol.create({name});
        return role.toSafeJSON();
    } catch (error) {
        throw error;
    }
};

// Listar todos los roles
exports.listRoles = async (page = 1, limit = 10, sortField = 'createdAt', sortOrder = 'ASC') => {
    try {
        const offset = (page - 1) * limit;
        const roles = await Rol.findAndCountAll({
            order: [[sortField, sortOrder]], // Ordena por el campo y orden especificado
            limit: limit,
            offset: offset
        });
        return {
            totalItems: roles.count,
            totalPages: Math.ceil(roles.count / limit),
            currentPage: page,
            users: roles.rows
        };
    } catch (error) {
        throw error;
    }
};

// Obtener un rol por ID
exports.getRoleById = async (id) => {
    try {
        const role = await Rol.findByPk(id);
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
        const role = await Rol.findByPk(id);
        if (!role) {
            throw new AppError('El rol no existe o ha sido eliminado.', 404);
        }
        const roleUpdate = await role.update(roleData);
        return roleUpdate.toSafeJSON();
    } catch (error) {
        throw error;
    }
};

// Eliminar un rol (eliminación lógica)
exports.deleteRole = async (id) => {
    try {
        const role = await Rol.findByPk(id);
        if (!role) {
            throw new AppError('El rol no existe.', 404);
        }
        await role.destroy();
        return true;
    } catch (error) {
        throw error;
    }
};
