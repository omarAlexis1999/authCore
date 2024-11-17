const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Rutas de CRUD para Rol
router.get('/', roleController.listRoles);
router.post('/', roleController.createRole);
router.get('/:id', roleController.getRoleById);
router.patch('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;
