const Convict = require('convict');
const Path = require('path');

const Schema = require('../environment/schema');

const config = Convict(Schema);
const mode = config.get('env');
const configPath = Path.resolve(__dirname, './.env.' + mode + '.json');
config.loadFile(configPath);
config.validate();

module.exports = config;