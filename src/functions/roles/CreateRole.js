const { app } = require('@azure/functions');
const roleService = require('../../services/roleService');
const errorHandler  = require('../../middlewares/errorHandler');
const logHandler = require('../../middlewares/logHandler');
const { responseHandler, parseRequestBody} = require('../../utils/requestUtils');

const createRole = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    const result = await logHandler('Create Role', context, async () => {
        const { name } = await parseRequestBody(request);
        return await roleService.createRole(name);
    });
    return responseHandler(201, result);
};
app.http('CreateRole', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'role',
    handler: errorHandler(createRole),
});
