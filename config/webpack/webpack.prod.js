// Dependencias
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Configuracion de produccion para webpack
const webpackConfig ={
  mode: 'production',
  devtool: 'none',

  plugins: [
    new OptimizeCssAssetsPlugin(),
  ],
};

module.exports = webpackConfig;
