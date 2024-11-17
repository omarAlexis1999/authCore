const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Rutas de gestión de usuarios
router.post('/', userController.register);
router.get('/', userController.listUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;
