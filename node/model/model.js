const fs = require('fs-extra');

let files = fs.readdirSync(__dirname + '/models');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    console.log(__dirname + '/models/' + f)
    module.exports[name] = require(__dirname + '/models/' + name);
}
