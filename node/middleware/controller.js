const fs = require('fs-extra');
var path = require('path')

function addMapping(router, method, path, func) {
    switch(method) {
        case 'GET':
            router.get(path, func);
            console.log(`register URL mapping: GET ${path}`);
            return;
        case 'POST':
            router.post(path, func);
            console.log(`register URL mapping: POST ${path}`);
            return;
        case 'PUT':
            router.put(path, func);
            console.log(`register URL mapping: PUT ${path}`);
            return;
        case 'DELETE':
            router.del(path, func);
            console.log(`register URL mapping: DELETE ${path}`);
            return;
        default:
            console.log(`Invalid method: ${method} with path: ${path}`);
            return;
    }
}

function addControllers(router, dir) {
    fs.readdirSync(path.resolve(__dirname, '..')  + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        let mappingList  = require(path.resolve(__dirname, '..') + '/' + dir + '/' + f);
        mappingList.forEach(mapping => addMapping(router, mapping.method, mapping.path, mapping.func))
    });
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router;
};