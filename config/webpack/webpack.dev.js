// Dependencias
const Path = require('path');

// Configuracion de desarrollo para webpack
const webpackConfig ={
  mode: 'development',
  devtool: "inline-source-map",

  output: {
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
    ]
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
    contentBase: Path.join(__dirname, 'public'),
    overlay: true,
    publicPath: "/"
  },
};

module.exports = webpackConfig;
