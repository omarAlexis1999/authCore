const authService = require('../services/authService');
const AppError = require("../utils/AppError");
const logger = require('../utils/logger');

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const token = await authService.login(email, password);
        res.status(200).json({ token });
        logger.info(`Usuario ${email} ha iniciado sesión`);
    } catch (error) {
        logger.warn(`Error al iniciar sesión, usuario ${email} : ${error.message}`);
        if (error instanceof AppError) {
            return next(error);
        }
        next(new AppError('Error en el servidor', 500));
    }
};