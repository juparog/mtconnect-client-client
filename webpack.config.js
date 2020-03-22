const path = require('path');
const npm_package = require('./package.json')

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
});

const port = process.env.PORT || 8080;

const config ={
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve('build'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test:/\.css$/,
        loader:'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [ HtmlWebpackPluginConfig ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true,
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'public')
  },
  node: {
    fs: "empty",
    module: "empty"
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components/'),
      Routes: path.resolve(__dirname, 'src/routes/'),
    }
  }
};

module.exports = config;
