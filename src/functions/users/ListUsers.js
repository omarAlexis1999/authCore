const { app } = require('@azure/functions');
const userService = require('../../services/userService');
const errorHandler  = require('../../middlewares/errorHandler');
const logHandler = require('../../middlewares/logHandler');
const { responseHandler, parseRequestBody} = require('../../utils/requestUtils');

const listUsers = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    const result = await logHandler('List User', context, async () => {
        const { page, limit, sortField, sortOrder } = Object.fromEntries(request.query);
        return await userService.listUsers(
            parseInt(page) || 1,
            parseInt(limit) || 10,
            sortField || 'createdAt',
            sortOrder || 'ASC'
        );
    });
    return responseHandler(200, result);
};
app.http('ListUser', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'user',
    handler: errorHandler(listUsers),
});
