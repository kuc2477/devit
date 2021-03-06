'user strict'

const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')


// extend base webpack configuration
const config = Object.create(baseConfig)

// configure entry point
config.debug = true
config.devtool = 'cheap-module-eval-source-map'
config.entry = [
  'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
  './app/app.dev.js'
]

// configure publicpath & module transformers
config.output.publicPath = 'http://localhost:3000/dist/'
config.module.loaders.push({
  // module level css
  test: /\.module\.css$/,
  loaders: [
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!'
  ]
}, {
  // generic css
  test: /^((?!\.module).)*\.css$/,
  loaders: [
    'style-loader',
    'css-loader'
  ]
  // module level scss
}, {
  test: /^((?!\.module).)*\.scss$/,
  loaders: [
    'style-loader',
    'css-loader',
    'sass-loader'
  ]
  // generic scss
}, {
  test: /\.module\.scss$/,
  loaders: [
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    'sass-loader'
  ]
})

// configure plugins
config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __DEV__: true,
    'global.GENTLY': JSON.stringify(false),
    'process.env': {
      'HOT': JSON.stringify(true),
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  })
)

module.exports = config
