const userService = require('../services/userService');
const AppError = require('../utils/AppError'); // Importa AppError
const logger = require('../utils/logger');

exports.register = async (req, res, next) => {
    try {
        const user = await userService.register(req.body);
        const { password, rol_id,...userData } = user;
        // Responde con el usuario creado y un mensaje
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            ...userData
        });
        logger.info(`Usuario ${user.email} registrado exitosamente`);
    } catch (error) {
        logger.error(`Error al registrar el usuario: ${error.message}`);
        if (error instanceof AppError) {
            return next(error);
        }
        next(new AppError('Error en el servidor', 500));
    }
};


exports.editUser = async (req, res,next) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const updatedUser = await userService.editUser(id, userData);
        const { password, rol_id, ...updateUserData } = updatedUser;
        res.status(200).json({ message: 'Usuario actualizado exitosamente',...updateUserData});
        logger.info(`Usuario ${updatedUser.email} actualizado exitosamente`);
    } catch (error) {
        logger.error(`Error al actualizar el usuario: ${error.message}`);
        if (error instanceof AppError) {
            return next(error);
        }
        next(new AppError('Error en el servidor', 500));
    }
};

exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        await userService.deleteUser(id);
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        logger.info(`Usuario con id ${id} eliminado exitosamente`);
    } catch (error) {
        logger.error(`Error al eliminar el usuario: ${error.message}`);
        if (error instanceof AppError) {
            return next(error);
        }
        next(new AppError('Error en el servidor', 500));
    }
};

exports.listUsers = async (req, res, next) => {
    const { page, limit, sortField, sortOrder } = req.query;

    try {
        const users = await userService.listUsers(
            parseInt(page) || 1,
            parseInt(limit) || 10,
            sortField || 'createdAt',
            sortOrder || 'ASC'
        );
        res.status(200).json(users);
        logger.info('Usuarios listados exitosamente');
    } catch (error) {
        logger.error(`Error al listar usuarios: ${error.message}`);
        if (error instanceof AppError) {
            return next(error);
        }
        next(new AppError('Error en el servidor', 500));
    }
};

exports.getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        res.status(200).json(user);
        logger.info(`Usuario ${user.email} listado exitosamente`);
    } catch (error) {
        logger.error(`Error al listar el usuario: ${error.message}`);
        if (error instanceof AppError) {
            return next(error);
        }
        next(new AppError('Error en el servidor', 500));
    }
};
