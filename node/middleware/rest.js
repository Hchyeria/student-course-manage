


var APIError = function (code, message){
    this.code = code || 'internal:unknown_error';
    this.message = message || '';
}

var restify = (pathPrefix) => {
    pathPrefix = pathPrefix || '/api/';
    return async (ctx, next) => {
        if (ctx.request.path.startsWith(pathPrefix)) {
            console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`);
            ctx.rest = (data, code='success') => {
                ctx.response.type = 'application/json';
                ctx.body = {
                    status: true,
                    code: code,
                    data: data
                }
            }
            try {
                await next();
            } catch (e) {
                console.log('Process API error...');
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    status: false,
                    code: e.code || 'internal:unknown_error',
                    message: e.message || ''
                };
            }
        } else {
            await next();
        }
    };
}



module.exports = {
    APIError: APIError,
    restify: restify
};