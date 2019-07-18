const webpack = require('webpack');
const path = require('path');
const env = process.env;
const packageInfo = require('./package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const banner = packageInfo.name + 'v' + packageInfo.version + ' | ' +
    '(c)' + new Date().getFullYear() + ' ' + packageInfo.author + ' | MIT license (' +
    packageInfo.license + ') | Github : ' +
    packageInfo.homepage;

const getBuildVersion = function (build) {
    let gitRevisionPlugin = new GitRevisionPlugin();
    let status = "";


    const generate = function(){
        let date = new Date();
        const pad = function(n){  // always returns a string
            return (n < 10 ? '0' : '') + n;
        };
        return date.getFullYear() +
            pad(date.getMonth() + 1) +
            pad(date.getDate()) +
            pad(date.getHours())
    };

    if(env.npm_lifecycle_event && env.npm_lifecycle_event =="watch"){
        status = "localbuild";
    }else{
        status = "rev."+gitRevisionPlugin.version();
    }
    return `${build.version}-${generate()}-${status}`;
}

const defaultConfig = {
    node: {
        fs: 'empty'
    },
    entry: {
        'ovenplayer': './src/js/ovenplayer.js',
        'ovenplayer.sdk' : './src/js/ovenplayer.sdk.js',

    },
    resolve: {
        modules: [
            path.resolve(__dirname, "src/js"),
            path.resolve("./node_modules")
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
                    plugins: [
                        "transform-es3-member-expression-literals",
                        "transform-es3-property-literals",
                        "transform-object-assign"
                    ],
                    presets: [
                        //babel-preset-env is a Babel preset meant to automatically set up babel plugins and include the necessary babel polyfills based on a set of target environments checked against a feature compatibility table.
                        ['env',{
                            "targets": {"ie": 8},
                            "debug": true,
                            "useBuiltIns" : true // polyfill
                        } ]
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
                        name: '[name].[ext]',
                        outputPath: path.resolve(__dirname, 'dist/production/ovenplayer')
                    }
                }]
            }

        ]
    }
};

const extendConfig = function (){
    console.log(env.npm_lifecycle_event );
    if(env.npm_lifecycle_event ==="watch"){
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
                new webpack.BannerPlugin(banner),
                new BundleAnalyzerPlugin({
                    analyzerMode: 'disabled'
                })
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
                                comments: false
                            }
                        },
                        extractComments: true // /(?:^!|@(?:license|preserve))/i
                    })
                ]
            },
            devtool: false,
            output: {
                filename: `[name].js`,
                chunkFilename: `[name]-${packageInfo.version}.js`,
                path: path.resolve(__dirname, 'dist/production/ovenplayer')
            },
            plugins: [
                new GitRevisionPlugin(),
                new webpack.DefinePlugin({
                    __VERSION__: `'${getBuildVersion(packageInfo)}'`
                }),
                new webpack.BannerPlugin(banner),
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static'
                })
            ]
        });
    }

    return defaultConfig;
}

module.exports = extendConfig();
