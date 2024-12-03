const { app } = require('@azure/functions');
const roleService = require('../../services/roleService');
const errorHandler  = require('../../middlewares/errorHandler');
const logHandler = require('../../middlewares/logHandler');
const { responseHandler, parseRequestBody} = require('../../utils/requestUtils');

const deleteRole = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    await logHandler('Delete Role', context, async () => {
        const { id } = request.params;
        return await roleService.deleteRole(id);
    });
    return responseHandler(200, {message: 'Rol eliminado exitosamente'});
};
app.http('DeleteRole', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'role/{id}',
    handler: errorHandler(deleteRole),
});
