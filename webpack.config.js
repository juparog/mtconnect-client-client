// Dependencias
const Path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtract = require('mini-css-extract-plugin');

// Inicializaciones
const PORT = 3000;

const BASE_PATH = __dirname;
const DIST_PATH = 'build/src/public';

const INDEX_INPUT = './public/index.html';
const INDEX_OUTPUT = 'index.html';

// Configuracion para webpack
// Nota: para ejecutar el build-prod de produccion cambie el publicPath: '/' por el publicPath: '/public'

const config ={
  devtool: "inline-source-map",

  entry: {
    app: ["./src/index.jsx"],
  },

  output: {
    path: Path.resolve(BASE_PATH, DIST_PATH),
    filename: "bundle.[hash:7].js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // ["babel-loader", "eslint-loader"] || "babel-loader" sin eslint
        loader: ["babel-loader", "eslint-loader"]
      },
      {
        test:/\.css$/,
        use:[
          {
            loader: MiniCSSExtract.loader,
            options: {
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader"
        ]
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
      template: INDEX_INPUT,
      filename: INDEX_OUTPUT,
      inject: "body"
    }),
    new MiniCSSExtract({
      filename: "styles.[hash:7].css",
      chunkFilename: "[id].css",
    }),
    new Dotenv()
  ],

  devServer: {
    port: PORT,
    historyApiFallback: true,
    contentBase: Path.join(__dirname, 'public'),
    overlay: true,
    publicPath: "/"
  },

  node: {
    fs: "empty",
    module: "empty"
  },

  resolve: {
    alias: {
      Components: Path.resolve(__dirname, 'src/components/'),
      Containers: Path.resolve(__dirname, 'src/containers/'),
      MTConnect: Path.resolve(__dirname, 'src/mtconnect/'),
      Routes: Path.resolve(__dirname, 'src/routes/'),
      Stylesheet: Path.resolve(__dirname, 'src/stylesheet/'),
      Utils: Path.resolve(__dirname, 'src/utils/')
    },
    extensions: ['.js', '.jsx']
  }
};

module.exports = config;
