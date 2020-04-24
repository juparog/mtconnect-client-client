// Dependencias
const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtract = require('mini-css-extract-plugin');
const Config = require('../environment/config');
const Webpack = require('webpack');

// Inicializaciones
const basePath = process.cwd();
const buildPath = './build';

const indexInput = './public/index.html';
const indexOutput = 'index.html';  

// Configuracion para webpack
function webpackConfigGenerator(mode) {
  const sourcemaps = mode==='production' ? true : false;
  const webpackInitConfig = {
    mode: mode,

    entry: {
      app: ["./src/index.jsx"],
    },

    output: {
      path: Path.resolve(basePath, buildPath),
      filename: "bundle.[hash:7].js",
      publicPath: "/",
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: [
            "babel-loader",
          ]
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            MiniCSSExtract.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: sourcemaps
              }
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: "file-loader",
          options: {
            name: "img/[name].[hash:7].[ext]"
          }
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: indexInput,
        filename: indexOutput,
        favicon: "./public/favicon.ico",
        inject: "body"
      }),
      new MiniCSSExtract({
        filename: "styles.[hash:7].css",
        chunkFilename: "[id].css",
      }),
      new Webpack.EnvironmentPlugin(Config.getProperties()['reactApp']),
    ],

    node: {
      // fs: "empty",
      // module: "empty"
    },

    resolve: {
      alias: {
        "~": Path.resolve(basePath, './src/'),
      },
      extensions: ['.js', '.jsx']
    }
  };

  return webpackInitConfig;
}

module.exports = webpackConfigGenerator;