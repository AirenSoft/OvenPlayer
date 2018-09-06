const webpack = require('webpack');
const path = require('path');
const env = process.env;
const packageInfo = require('./package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const banner = packageInfo.name + 'v' + packageInfo.version + ' | ' +
    '(c)' + new Date().getFullYear() + ' ' + packageInfo.author + ' | MIT license (' +
    packageInfo.license + ') | Github : ' +
    packageInfo.homepage;

const getBuildVersion = function (build) {
    let gitRevisionPlugin = new GitRevisionPlugin();
    let status = "";
    if(env.npm_lifecycle_event && env.npm_lifecycle_event =="watch"){
        status = "localbuild";
    }else{
        status = "rev."+gitRevisionPlugin.version();
    }
    return `${build.version}-${status}`;
}

const defaultConfig = {
    entry: {
        'ovenplayer': './src/js/ovenplayer.js',
        'ovenplayer.sdk' : './src/js/ovenplayer.sdk.js',
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "src/js")
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    babelrc: false,
                    presets: [
                        ['env']
                    ],
                    plugins: [
                        'transform-object-assign'
                    ]
                }
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            compress: true,
                            strictMath: true,
                            noIeCompat: true
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader'
                }]
            },
            {
                test: /\.(swf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }]
            }
        ]
    }
};
/*
* useRelativePath :  대상 파일 컨텍스트에 대한 상대 URI를 생성할지 여부를 지정합니다.
* publicPath : 대상 파일에 대한 사용자 지정 공용 경로를 지정합니다.
* outputPath : 대상 파일을 저장할 파일 시스템 경로를 지정하십시오.
* */

const extendConfig = function (){
    console.log(env.npm_lifecycle_event );
    if(env.npm_lifecycle_event =="watch"){
        Object.assign(defaultConfig, {
            mode: 'development',
            devtool: 'inline-source-map',
            output: {
                filename: '[name].js',
                path: path.resolve(__dirname, 'dist/development/ovenplayer')
            },
            plugins: [
                new GitRevisionPlugin(),
                new webpack.DefinePlugin({
                    __VERSION__: `'${getBuildVersion(packageInfo)}'`
                }),
                new webpack.BannerPlugin(banner)

            ]
        });
    }else{
        Object.assign(defaultConfig, {
            mode: 'production',
            optimization: {
                minimizer: [
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            output: {
                                comments: true,
                            }
                        },
                        extractComments: true // /(?:^!|@(?:license|preserve))/i
                    })
                ]
            },

            devtool: 'source-map',
            output: {
                filename: '[name].js',
                path: path.resolve(__dirname, 'dist/production/ovenplayer')
            },
            plugins: [
                new GitRevisionPlugin(),
                new webpack.DefinePlugin({
                    __VERSION__: `'${getBuildVersion(packageInfo)}'`
                }),
                new webpack.BannerPlugin(banner),
                new CopyWebpackPlugin(
                    [
                        {
                            from: 'src/assets/OvenPlayerFlash.swf',
                            to: path.resolve(__dirname, 'dist/production/ovenplayer/')
                        }
                    ]
                )
            ]
        });
    }

    return defaultConfig;
}

module.exports = extendConfig();
