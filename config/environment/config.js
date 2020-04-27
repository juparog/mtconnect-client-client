const Convict = require('convict');
const Fs = require('fs');
const Path = require('path');

const Schema = require('./schema');

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