const Koa = require('koa');
const koaBody = require('koa-body');
const compress = require('koa-compress');
const controller = require('./middleware/controller');
const rest = require('./middleware/rest');
const insertModel = require('./model/insert');


const app = new Koa();


// log request URL:
app.use(async (ctx, next) =>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next();
})


/* {
    insertModel(1)
} */

app.use(
    compress({
      filter: function(content_type) {
        return /text/i.test(content_type);
      },
      threshold: 1024,
      flush: require('zlib').Z_SYNC_FLUSH
    }))

app.use(koaBody({ multipart: true }))

app.use(rest.restify());

// add controllers:
// add router middleware:
app.use(controller().routes()).use(controller().allowedMethods());

app.listen(2333);
console.log('app started at port 2333..');