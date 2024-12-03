const { app } = require('@azure/functions');
const userService = require('../../services/userService');
const errorHandler  = require('../../middlewares/errorHandler');
const logHandler = require('../../middlewares/logHandler');
const { responseHandler, parseRequestBody} = require('../../utils/requestUtils');

const updateUser = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    const result = await logHandler('Update User', context, async () => {
        const { id } = request.params;
        const data= await parseRequestBody(request);
        return await userService.editUser(id, data);
    });
    return responseHandler(200, result);
};
app.http('UpdateUser', {
    methods: ['PATCH'],
    authLevel: 'anonymous',
    route: 'user/{id}',
    handler: errorHandler(updateUser),
});
