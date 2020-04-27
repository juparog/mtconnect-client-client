const Convict = require('convict');
const Path = require('path');
const Fs = require('fs');
const Schema = require('../environment/schema');

const config = Convict(Schema);
const mode = config.get('env');

const configPath = Path.resolve(__dirname, './.env.' + mode + '.json');
if (Fs.existsSync(configPath)) {
  config.loadFile(configPath);
  config.validate();
} else {
  console.log('* Ejecutandoce con la configuración .env por defecto');
}

module.exports = config;