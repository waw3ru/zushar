/*
* created by waweru
* */

'use strict';

const path = require('path');
const webpack = require('webpack');
const node_env = proces.env.NODE_ENV;

module.exports = {
    output: {
        filename: '[name].bundle.js',
        publicPath: '/dist/',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "_": "lodash",
            "window.Lodash": "lodash",
            "lodash": "lodash"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API: (node_env !== 'production') ? JSON.stringify('http://127.0.0.1:3000/api/') : JSON.stringify('http://zushar.herokuapp.com/api/')
            }
        })
    ],
    performance: {
        hints: false
    },
    resolve: {
        modules: ['node_modules', 'bower_components', 'custom_components']
    },
    devtool: '#eval-source-map'
}


/*
* @docs:
*   [(NODE_ENV | environment_variable)]:- node_env specific configuration for webapck
* */
if (node_env === 'production') {
    module.exports.entry = {
        main: './src/zushar-main/index.js',
        docs: './src/zushar-docs/index.js'
    };
  module.exports.devtool = false;
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]);
    module.exports.module.rules = (module.exports.module.rules || []).concat([
        {
            test: /\.js$/,
            use: [
                {
                    loader: 'babel-loader',
                    query: { compact: true }
                }
            ],
            exclude: /(node_modules|bower_components|custom_components)/
        }
    ]);

}
else {
    module.exports.entry = {
        main: ['webpack/hot/dev-server', 'webpack-hot-middleware/client', './src/zushar-main/index.js'],
        docs: ['webpack/hot/dev-server', 'webpack-hot-middleware/client', './src/zushar-docs/index.js']
    };
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]);
    module.exports.module.rules = (module.exports.module.rules || []).concat([
        {
            test: /\.js$/,
            use: [
                {
                    loader: 'babel-loader',
                    query: { compact: true }
                },
                {
                    loader: 'webpack-module-hot-accept'
                }
            ],
            exclude: /(node_modules|bower_components|custom_components)/
        }
    ]);

}