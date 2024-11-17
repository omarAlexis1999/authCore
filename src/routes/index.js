const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/role', roleRoutes);

module.exports = router;