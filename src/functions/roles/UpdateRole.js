const { app } = require('@azure/functions');
const roleService = require('../../services/roleService');
const errorHandler  = require('../../middlewares/errorHandler');
const logHandler = require('../../middlewares/logHandler');
const { responseHandler, parseRequestBody} = require('../../utils/requestUtils');

const updateRole = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    const result = await logHandler('Update Role', context, async () => {
        const { id } = request.params;
        const data = await parseRequestBody(request);
        return await roleService.updateRole(id,data);
    });
    return responseHandler(200, result);
};
app.http('UpdateRole', {
    methods: ['PATCH'],
    authLevel: 'anonymous',
    route: 'role/{id}',
    handler: errorHandler(updateRole),
});
