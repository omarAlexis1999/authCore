const roleService = require('../services/roleService');
const AppError = require('../utils/AppError'); // Importa AppError
const logger = require('../utils/logger');

exports.createRole = async (req, res, next) => {
    try {
        const { name } = req.body;
        const role = await roleService.createRole(name);
        res.status(201).json({ message: 'Rol creado exitosamente', ...role });
        logger.info(`Rol ${name} creado exitosamente`);
        
    } catch (error) {
        logger.error(`Error al crear el rol: ${error.message}`);
        if (error instanceof AppError) {
            return next(error);
        }
        next(new AppError('Error en el servidor', 500));
    }
};

exports.listRoles = async (req, res, next) => {
    try {
        const { page, limit, sortField, sortOrder } = req.query;
        const roles = await roleService.listRoles(
            parseInt(page) || 1,
            parseInt(limit) || 10,
            sortField || 'createdAt',
            sortOrder || 'ASC'
        );
        res.status(200).json(roles);
        logger.info('Roles listados exitosamente');
    } catch (error) {
        logger.error(`Error al listar roles: ${error.message}`);
        if (error instanceof AppError) {
            return next(error);
        }
        next(new AppError('Error en el servidor', 500));
    }
};

exports.getRoleById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const role = await roleService.getRoleById(id);
        res.status(200).json(role);
        logger.info(`Rol ${role.name} listado exitosamente`)
    } catch (error) {
        logger.error(`Error al listar el rol: ${error.message}`);
        if (error instanceof AppError) {
            return next(error);
        }
        next(new AppError('Error en el servidor', 500));
    }
};

exports.updateRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const roleData = req.body;
        const updatedRole = await roleService.updateRole(id, roleData);
        res.status(200).json({ message: 'Rol actualizado exitosamente', ...updatedRole });
        logger.info(`Rol ${updatedRole.name} actualizado exitosamente`);
    } catch (error) {
        logger.error(`Error al actualizar el rol: ${error.message}`);
        if (error instanceof AppError) {
            return next(error);
        }
        next(new AppError('Error en el servidor', 500));
    }
};

exports.deleteRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        await roleService.deleteRole(id);
        res.status(200).json({ message: 'Rol eliminado exitosamente' });
        logger.info(`Rol con id ${id} eliminado exitosamente`);
    } catch (error) {
        logger.error(`Error al eliminar el rol: ${error.message}`);
        if (error instanceof AppError) {
            return next(error);
        }
        next(new AppError('Error en el servidor', 500));
    }
};
