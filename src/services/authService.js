const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError')
require('dotenv').config()

exports.login = async (email, password) => {
    try {
        const user = await User.findOne({
            where: { email },
            attributes: { include: ['password'] }
        });
        // Verifica si el usuario existe y si la contraseña es válida
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new AppError('Credenciales no válidas.', 401);
        }
        // Genera el token
        return jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

    } catch (error) {
        throw error;
    }
};