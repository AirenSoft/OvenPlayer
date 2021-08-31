const webpack = require('webpack');
const path = require('path');
const packageInfo = require('./package.json');

const config = {
    mode: 'production',
    entry: {
        'ovenplayer': ['core-js/stable', 'whatwg-fetch', './src/js/ovenplayer.js']
    },
    target: ['web', 'es5'],
    resolve: {
        modules: [
            path.resolve(__dirname, 'src/js'),
            path.resolve('./node_modules')
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'OvenPlayer',
            type: 'umd',
            export: 'default'
        },
        clean: true
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        'useBuiltIns': 'entry',
                                        'corejs': 3,
                                        'targets': { 'ie': '11' }
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                compress: true,
                                strictMath: true
                            }
                        }
                    },
                ],
            },
            {
                test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                type: 'asset/inline'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __VERSION__: `'${packageInfo.version}'`
        })
    ]
};

module.exports = config;