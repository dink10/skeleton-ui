const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const proxyServer = require('./server')

const OUTPUT_PATH = path.resolve(__dirname, 'dist')

const MODE = ((args) => {
  const tokens = args.match(/--mode=(\w+)/i)
  const mode = tokens && tokens.length > 1 ? tokens[1].toLowerCase() : 'production'
  return mode
})(process.argv.join(' '))

const DEV = MODE === 'development'
const PROD = MODE === 'production'

const { PORT, GOOGLE_LOGIN_CLIENT_ID } = process.env

const config = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'prop-types',
      'redux',
      'react-redux',
      'redux-thunk',
      'redux-logger',
    ],
    index: [
      './src/index.tsx'
    ]
  },
  output: {
    path: OUTPUT_PATH,
    filename: 'js/[name].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: [{ loader: 'ts-loader' }], exclude: [/node_modules/, /tests/] },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { minimize: PROD } }] },
      { test: /\.(jpg|png)$/, use: 'file-loader?name=./images/[name].[ext]' },
      { test: /\.(woff|woff2|ttf|otf|eot|svg)$/, use: 'file-loader?name=./fonts/[name].[ext]' }
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({ SERVICE_URL: '"/api/v1/"' }),
    new MiniCssExtractPlugin({ filename: '[name].bundle.css', allChunks: true }),
    new HtmlPlugin({
      clientID: GOOGLE_LOGIN_CLIENT_ID || '__GOOGLE_LOGIN_CLIENT_ID__',
      template: './src/index.html'
    })
  ],
  // node: { Buffer: false }, // https://github.com/webpack-contrib/style-loader/issues/194
  devServer: {
    hot: true,
    port: PORT || 8080,
    inline: true,
    disableHostCheck: true,
    contentBase: OUTPUT_PATH,
    historyApiFallback: true,
    before: proxyServer,
  }
}

if (DEV) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
