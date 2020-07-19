const common = require("./webpack.common");
const path = require('path')
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = merge(common, {
    mode: "production",

    plugins: [
        new WebpackAutoInject({
            components: {
                AutoIncreaseVersion: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    allowTsInNodeModules: true,
                    configFile: 'tsconfig.prod.json'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
        ]
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].min.js'
    },
});