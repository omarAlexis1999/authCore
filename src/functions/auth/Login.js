const { app } = require('@azure/functions');
const authService = require('../../services/authService');
const errorHandler  = require('../../middlewares/errorHandler');
const logHandler = require('../../middlewares/logHandler');
const { responseHandler, parseRequestBody} = require('../../utils/requestUtils');

const login = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    const result = await logHandler('Login', context, async () => {
        const {email, password} = await parseRequestBody(request);
        return await authService.login(email, password);
    });
    return responseHandler(200, {token: result});
};
app.http('Login', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'auth/login',
    handler: errorHandler(login),
});
