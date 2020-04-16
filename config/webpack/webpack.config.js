const baseConfigGenerator = require('./webpack.common.js');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');
const merge = require('webpack-merge');

function webpackEnviromentSelector() {
  let config;
  const mode = process.env.NODE_ENV || 'development';
  if (mode==='development') {
    config = devConfig;
  } else {
    if (mode==='production') {
      config = prodConfig;
    }
  }
  const baseConfig = baseConfigGenerator(mode);
  return merge(baseConfig, config);
}

module.exports = webpackEnviromentSelector;