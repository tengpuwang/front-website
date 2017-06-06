const path = require('path')
const webpack = require('webpack')

module.exports = {
    devtool: '#source-map',
    entry: {
        app: './src/client-entry.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'client-bundle.js'
    },
    resolve: {
        root: [
            path.resolve(__dirname, "../")
        ],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'app': path.resolve(__dirname, '../app'),
        }
    },
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
    }
}
