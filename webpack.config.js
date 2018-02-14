const path = require('path');
// console.log(path);
const webpack = require('webpack');
// console.log(webpack);
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './src'),
    devServer : {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000
    },
    entry: { 
        app: './js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "app.js"
    },
    module: {
        rules: [
        {
            test: /\.(css|scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            })
        },
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: ['babel-loader']
        },
        {
            test: /\.(html)$/,
            use: {
                loader: 'html-loader'
            }
        },
        {
            test: /\.(png|jpeg|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath:'img/', 
                }  
              }
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        new ExtractTextPlugin('css/style.css'),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname,'node_modules','bootstrap','dist','css','bootstrap.min.css'),
            to:'css'
        }]),
    ]
}
