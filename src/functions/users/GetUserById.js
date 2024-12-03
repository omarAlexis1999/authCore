const { app } = require('@azure/functions');
const userService = require('../../services/userService');
const errorHandler  = require('../../middlewares/errorHandler');
const logHandler = require('../../middlewares/logHandler');
const { responseHandler, parseRequestBody} = require('../../utils/requestUtils');

const getUserById = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    const result = await logHandler('Get User', context, async () => {
        const { id } = request.params;
        return await userService.getUserById(id);
    });
    return responseHandler(200, result);
};
app.http('GetUserById', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'user/{id}',
    handler: errorHandler(getUserById),
});
