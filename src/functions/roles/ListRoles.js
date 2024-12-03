const { app } = require('@azure/functions');
const roleService = require('../../services/roleService');
const errorHandler  = require('../../middlewares/errorHandler');
const logHandler = require('../../middlewares/logHandler');
const { responseHandler, parseRequestBody} = require('../../utils/requestUtils');

const listRoles = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    const result = await logHandler('List Roles', context, async () => {
        const { page, limit, sortField, sortOrder } = Object.fromEntries(request.query);
        return await roleService.listRoles(page, limit, sortField, sortOrder);
    });
    return responseHandler(200, result);
};
app.http('ListRoles', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'role',
    handler: errorHandler(listRoles),
});
