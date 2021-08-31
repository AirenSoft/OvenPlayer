const config = require('./webpack.config.js')
const path = require('path');

console.log(config)

config.mode = 'development';
config.output.path = path.resolve(__dirname, 'dev');

module.exports = config;