const { app } = require('@azure/functions');
const userService = require('../../services/userService');
const errorHandler  = require('../../middlewares/errorHandler');
const logHandler = require('../../middlewares/logHandler');
const { responseHandler, parseRequestBody} = require('../../utils/requestUtils');

const createUser = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    const result = await logHandler('Create User', context, async () => {
        const data= await parseRequestBody(request);
        return await userService.register(data);
    });
    const { password, ...dataResponse } = result;
    return responseHandler(201, dataResponse);
};
app.http('CreateUser', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'user',
    handler: errorHandler(createUser),
});
