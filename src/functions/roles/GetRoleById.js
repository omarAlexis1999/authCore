const { app } = require('@azure/functions');
const roleService = require('../../services/roleService');
const errorHandler  = require('../../middlewares/errorHandler');
const logHandler = require('../../middlewares/logHandler');
const { responseHandler, parseRequestBody} = require('../../utils/requestUtils');

const getRoleById = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    const result = await logHandler('Get Role', context, async () => {
        const { id } = request.params;
        return await roleService.getRoleById(id);
    });
    return responseHandler(200, result);
};
app.http('GetRoleById', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'role/{id}',
    handler: errorHandler(getRoleById),
});
