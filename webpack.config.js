const path = require('path')
const webpack = require('webpack')

module.exports = Object.assign({}, base, {
  target: 'node',
  devtool: false,
  entry: './src/server-entry.js',
  output: Object.assign({}, base.output, {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'app.js',
    libraryTarget: 'commonjs2'
  }),
  externals: Object.keys(require('./package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    })
  ]
})