const db = require('./src/models');

(async () => {
    try {
        console.log('Conectando a la base de datos...');
        // Sincroniza los modelos con la base de datos
        await db.sequelize.sync({ alter: true }); // Usa { force: true } si deseas recrear las tablas
        console.log('Base de datos sincronizada correctamente.');
        process.exit(0); // Finaliza el script tras la sincronización
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
        process.exit(1); // Finaliza con error si ocurre un problema
    }
})();
