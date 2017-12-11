const webpack = require('webpack');
const path = require('path');

const loaders = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
        query: {
            presets: ['es2015', 'react']
        }
    },
    {
        test: /\.css$/,
        loader: 'css-loader?minimize!less-loader',
    },
    {test:/\.less/,loader:'style-loader!css-loader!autoprefixer-loader!less-loader'}
];
module.exports = {
    entry: __dirname + '/public/entry.js',
    output: {
        path: __dirname + '/public/dist',
        filename: 'build.js'
    },
    module: {
        loaders: loaders
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({minimize: true}),
        // new ExtractTextPlugin("style.css"),
        // new webpack.LoaderOptionsPlugin({
        //     debug: false,
        //     options: {
        //         postcss: [
        //             autoprefixer()
        //         ],
        //     },
        // })

    ],

    watch: true

};