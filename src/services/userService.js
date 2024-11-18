const { Usuario , Rol } = require('../models');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError')
const {Op} = require('sequelize');

exports.register = async (userData) => {
    try {
        const { email, password } = userData;

        const existingUser = await Usuario.findOne({
            where: {
                email: email,
                deletedAt: null // Busca registros activos, donde deletedAt está vacío
            }
        });
        if (existingUser) {
            throw new AppError(`El correo electrónico ${email} ya está en uso.`, 409);
        }

        // Consulta para obtener el id del rol 'USER'
        const rol = await Rol.findOne({
            where: { name: 'USER' , deletedAt: null} });
        if (!rol) {
            throw new AppError('No se puede asignar un rol al usuario', 404);
        }

        // Encripta la contraseña
        const hashedPassword = bcrypt.hashSync(password, 10);

        return await Usuario.create({
            ...userData, // Pasa las propiedades de userData
            password: hashedPassword, // Sobrescribe la propiedad password con la encriptada
            rol_id: rol.id, // Asigna el rol_id
        });
    } catch (error) {
        console
        throw error;
    }
};


exports.editUser = async (id, userData) => {
    try {
        const user = await Usuario.findByPk(id,{
            where: {
                deletedAt: null
            },
        });
        if (!user) {
            throw new AppError('Usuario no encontrado', 404);
        }

        // Verifica si el nuevo correo ya está en uso por otro usuario
        if (userData.email) {
            const emailExists = await Usuario.findOne({
                where: {
                    email: userData.email,
                    id: { [Op.ne]: id }, // Excluye el usuario actual
                    deletedAt: null, // Busca registros activos, donde deletedAt está vacío
                }
            });
            if (emailExists) {
                throw new AppError(`El correo electrónico ${userData.email} ya está en uso.`, 409);
            }
        }

        // Elimina el campo 'password' si existe en userData para que no se actualice
        if ('password' in userData) {
            delete userData.password;
        }

        // Actualiza el usuario
        await user.update(userData);
        return user;

    } catch (error) {
        throw error;
    }
};

exports.deleteUser = async (id) => {
    try {
        const user = await Usuario.findByPk(id,{
            where: {
                deletedAt: null
            },
        });
        if (!user) {
            throw new AppError('Usuario no encontrado', 404);
        }
        await user.destroy();
        return true;
    } catch (error) {
        throw error;
    }
};

exports.listUsers = async (page = 1, limit = 10, sortField = 'createdAt', sortOrder = 'ASC') => {
    try {
        const offset = (page - 1) * limit;

        // Obtiene los usuarios con paginación, orden y filtro de usuarios activos
        const users = await Usuario.findAndCountAll({
            where: {
                deletedAt: null
            },
            attributes: { exclude: ['password','deletedAt','rol_id'] },
            order: [[sortField, sortOrder]], // Ordena por el campo y orden especificado
            limit: limit,
            offset: offset
        });

        return {
            totalItems: users.count,
            totalPages: Math.ceil(users.count / limit),
            currentPage: page,
            users: users.rows
        };
    } catch (error) {
        throw error;
    }
};

exports.getUserById = async (id) => {
    try {
        const user = await Usuario.findByPk(id, {
            where: {
                deletedAt: null
            },
            attributes: { exclude: ['password','deletedAt','rol_id'] }
        });
        if (!user) {
            throw new AppError('El usuario no existe o ha sido eliminado.', 404);
        }
        return user;
    }
    catch (error) {
        throw error;
    }
}

