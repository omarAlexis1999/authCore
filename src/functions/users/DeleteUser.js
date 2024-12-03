const { app } = require('@azure/functions');
const userService = require('../../services/userService');
const errorHandler  = require('../../middlewares/errorHandler');
const logHandler = require('../../middlewares/logHandler');
const { responseHandler, parseRequestBody} = require('../../utils/requestUtils');

const deleteUser = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    await logHandler('Delete User', context, async () => {
        const { id } = request.params;
        return await userService.deleteUser(id);
    });
    return responseHandler(200, {message: 'User eliminado exitosamente'});
};
app.http('DeleteUser', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'user/{id}',
    handler: errorHandler(deleteUser),
});
