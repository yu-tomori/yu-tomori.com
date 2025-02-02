const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js',
        publicPath: '/',
    },
    target: 'web',
    devServer: {
        port: '8080',
        static: {
            directory: path.join(__dirname, 'public'),
        },
        open: true,
        hot: true,
        liveReload: true,
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.md'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.md$/,
                type: 'asset/resource',
                generator: {
                    filename: 'posts/[name][ext]'
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html')
        }),
        new Dotenv(),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/posts.json',
                    to: 'posts.json'
                },
                {
                    from: 'public/style.css',
                    to: 'style.css'
                },
                {
                    from: 'public/posts/*.md',
                    to: 'posts/[name][ext]'
                },
                {
                    from: 'public/posts/images/*',
                    to: 'posts/images/[name][ext]'
                }
            ],
        }),
    ],
};
