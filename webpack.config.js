const path = require('path');
const package = require('./package.json')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin');
const loader = require('./loaders/remarks-loader');

const publicPath = '/'

module.exports = {
    // mode: 'none',
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        main: path.join(__dirname, 'src/app.js'),
        //vendor: Object.keys(package.dependencies)
    },
    output: {
        publicPath: publicPath,
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    devServer: {
        contentBase: './dist',
        publicPath: publicPath,
        hot: true
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                //exlude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        onlyCompileBundledFiles: true
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [

                    {
                        loader: 'babel-loader'
                    },
                    // {
                    //     loader: path.join(__dirname, 'loaders', 'remarks-loader.js'),
                    //     options: {
                    //         text: 'ssssssssssssss'
                    //     }
                    // }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: -10
                }
            }
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
    // externals: {
    //     'react': "react",
    //     'react-dom': "react-dom"
    // }
}